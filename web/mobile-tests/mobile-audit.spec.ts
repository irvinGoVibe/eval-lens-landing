import { test, expect, type Page, type TestInfo } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { homeScenario, type InteractionState } from "./scenarios/home";

type DeviceConfig = {
  id: string;
  label: string;
  viewport: { width: number; height: number };
};

type PageConfig = {
  id: string;
  url: string;
  scenario: keyof typeof scenarios;
  states: string[];
  criticalFlows: string[];
  waitFor?: { selector?: string; skeletonSelectors?: string[] };
  motion?: "reduce" | "no-preference";
  freezeAnimations?: boolean;
};

type SuiteConfig = {
  version: number;
  defaults: {
    locale: string;
    timezone: string;
    scrollStepRatio: number;
    maxCheckpoints: number;
    motion: "reduce" | "no-preference";
    freezeAnimations: boolean;
  };
  devices: DeviceConfig[];
  pages: PageConfig[];
};

type RawFinding = {
  category: string;
  severity: "blocker" | "high" | "medium" | "low";
  component: string;
  selector: string;
  problem: string;
  expected: string;
  actual: string;
  probableCause: string;
  suggestedFix: string;
  acceptance: string[];
  confidence: "high" | "medium" | "low";
  regressionRisk: "high" | "medium" | "low";
};

type Issue = RawFinding & {
  id: string;
  device: string;
  viewport: string;
  browser: string;
  url: string;
  state: string;
  scrollPosition: number;
  evidence: { screenshot: string };
  checkpoints: string[];
};

const scenarios = { home: homeScenario };
const configPath = path.resolve("mobile-tests", "pages.yaml");
const suite = JSON.parse(readFileSync(configPath, "utf8")) as SuiteConfig;
const phase = process.env.MOBILE_QA_PHASE ?? "audit";

function stableId(key: string) {
  return `MOBILE-${createHash("sha1").update(key).digest("hex").slice(0, 7).toUpperCase()}`;
}

function severityRank(value: Issue["severity"]) {
  return { blocker: 0, high: 1, medium: 2, low: 3 }[value];
}

async function stabilize(page: Page, pageConfig: PageConfig) {
  await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => undefined);
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  if (pageConfig.waitFor?.selector) {
    await page.locator(pageConfig.waitFor.selector).waitFor({ state: "attached", timeout: 20_000 });
  }
  for (const selector of pageConfig.waitFor?.skeletonSelectors ?? []) {
    await page.locator(selector).waitFor({ state: "hidden", timeout: 20_000 });
  }
  await scenarios[pageConfig.scenario].stabilize(page);
  if (pageConfig.freezeAnimations ?? suite.defaults.freezeAnimations) {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          caret-color: transparent !important;
        }
      `,
    });
    await page.evaluate(() => {
      document.getAnimations().forEach((animation) => animation.pause());
      document.querySelectorAll("video").forEach((video) => video.pause());
    });
  }
}

async function inspectViewport(page: Page): Promise<RawFinding[]> {
  return page.evaluate(() => {
    const findings: RawFinding[] = [];
    const visible = (element: Element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) > 0.01 &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < innerHeight
      );
    };
    const selector = (element: Element) => {
      const testId = element.getAttribute("data-testid");
      if (testId) return `[data-testid="${CSS.escape(testId)}"]`;
      if (element.id) return `#${CSS.escape(element.id)}`;
      const parts: string[] = [];
      for (let node: Element | null = element; node && node !== document.body && parts.length < 4; node = node.parentElement) {
        let part = node.localName;
        const classes = [...node.classList].filter((name) => !name.includes(":" )).slice(0, 2);
        if (classes.length) part += `.${classes.map(CSS.escape).join(".")}`;
        parts.unshift(part);
      }
      return parts.join(" > ");
    };
    const component = (element: Element) => {
      const root = element.closest("[data-testid], section[id], header, footer, main") ?? element;
      return root.getAttribute("data-testid") || root.id || root.localName;
    };
    const issue = (
      element: Element,
      finding: Omit<RawFinding, "component" | "selector">,
    ) => findings.push({ ...finding, component: component(element), selector: selector(element) });
    const elements = [...document.querySelectorAll("body *")].filter(visible);
    const viewportMeta = document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "";

    if (document.documentElement.scrollWidth > innerWidth + 1) {
      issue(document.documentElement, {
        category: "horizontal-overflow",
        severity: "high",
        problem: "The document is wider than the viewport.",
        expected: `document scrollWidth <= ${innerWidth}px`,
        actual: `document scrollWidth is ${document.documentElement.scrollWidth}px`,
        probableCause: "A descendant width, min-width, transform, or grid/flex constraint exceeds the mobile viewport.",
        suggestedFix: "Identify the originating element and correct its parent sizing or min-width constraint.",
        acceptance: ["No document-level horizontal overflow", "Desktop layout remains unchanged"],
        confidence: "high",
        regressionRisk: "medium",
      });
    }

    if (!/viewport-fit\s*=\s*cover/i.test(viewportMeta)) {
      issue(document.documentElement, {
        category: "safe-area",
        severity: "medium",
        problem: "Viewport metadata does not opt into safe-area coverage.",
        expected: "viewport-fit=cover is present",
        actual: viewportMeta || "viewport meta is missing",
        probableCause: "The page viewport metadata was configured without iPhone safe-area support.",
        suggestedFix: "Add viewport-fit=cover and verify fixed edges with safe-area insets.",
        acceptance: ["Viewport metadata contains viewport-fit=cover", "Fixed UI avoids the notch and home indicator"],
        confidence: "high",
        regressionRisk: "low",
      });
    }

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const hasScrollableAncestor = (() => {
        for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
          const parentStyle = getComputedStyle(parent);
          if (/auto|scroll/.test(parentStyle.overflowX) && parent.scrollWidth > parent.clientWidth + 1) return true;
        }
        return false;
      })();

      if (
        document.documentElement.scrollWidth > innerWidth + 1 &&
        !hasScrollableAncestor &&
        (rect.left < -1 || rect.right > innerWidth + 1 || rect.width > innerWidth + 1)
      ) {
        issue(element, {
          category: "element-overflow",
          severity: "medium",
          problem: "A visible element extends outside the viewport.",
          expected: `Element bounds remain within 0..${innerWidth}px or an intentional scroll container`,
          actual: `left=${Math.round(rect.left)}, right=${Math.round(rect.right)}, width=${Math.round(rect.width)}`,
          probableCause: `Computed width=${style.width}, min-width=${style.minWidth}, transform=${style.transform}`,
          suggestedFix: "Correct the responsible width/min-width/grid/flex constraint instead of hiding overflow globally.",
          acceptance: ["Element remains within viewport", "No document-level horizontal overflow"],
          confidence: "high",
          regressionRisk: "medium",
        });
      }
    }

    const interactive = elements.filter((element) =>
      element.matches('a, button, input, select, textarea, [role="button"]'),
    );
    for (const element of interactive) {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        issue(element, {
          category: "touch-target",
          severity: "medium",
          problem: "Interactive target is smaller than 44x44 CSS pixels.",
          expected: "Touch target is at least 44x44px where practical",
          actual: `${Math.round(rect.width)}x${Math.round(rect.height)}px`,
          probableCause: "The visual control dimensions are also being used as the hit area.",
          suggestedFix: "Increase the hit area with min-size, padding, or a wrapper without changing visual hierarchy.",
          acceptance: ["Target hit area is at least 44x44px", "Adjacent controls remain distinct"],
          confidence: "high",
          regressionRisk: "low",
        });
      }
      if (element.matches("input, select, textarea") && parseFloat(getComputedStyle(element).fontSize) < 16) {
        issue(element, {
          category: "input-zoom",
          severity: "high",
          problem: "Form control text is below 16px and can trigger iOS focus zoom.",
          expected: "Mobile form control font-size is at least 16px",
          actual: getComputedStyle(element).fontSize,
          probableCause: "Desktop form typography is reused on iPhone.",
          suggestedFix: "Set the mobile form control font-size to at least 16px.",
          acceptance: ["No iOS focus zoom", "Desktop typography remains unchanged"],
          confidence: "high",
          regressionRisk: "low",
        });
      }
    }

    const fixed = elements.filter(
      (element) =>
        ["fixed", "sticky"].includes(getComputedStyle(element).position) &&
        !element.matches('[role="dialog"], [aria-modal="true"], .partner-modal') &&
        !element.closest('[role="dialog"], [aria-modal="true"], .partner-modal'),
    );
    for (const overlay of fixed) {
      const a = overlay.getBoundingClientRect();
      for (const target of interactive) {
        if (overlay === target || overlay.contains(target) || target.contains(overlay)) continue;
        const b = target.getBoundingClientRect();
        const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
        const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        const overlap = width * height;
        if (overlap > b.width * b.height * 0.25) {
          issue(target, {
            category: "fixed-overlap",
            severity: "high",
            problem: "A fixed or sticky element covers an interactive target.",
            expected: "Interactive target remains visible and touchable",
            actual: `${selector(overlay)} covers ${Math.round(overlap)}px² of the target`,
            probableCause: "Fixed/sticky offsets, safe-area padding, or stacking context do not reserve content space.",
            suggestedFix: "Correct the sticky/fixed offset and content spacing at the parent layout level.",
            acceptance: ["Target is not covered at this checkpoint", "Sticky behavior still works"],
            confidence: "medium",
            regressionRisk: "medium",
          });
        }
      }
    }

    for (const image of elements.filter((element) => element instanceof HTMLImageElement)) {
      const img = image as HTMLImageElement;
      if (!img.naturalWidth || !img.naturalHeight) continue;
      const rect = img.getBoundingClientRect();
      const naturalRatio = img.naturalWidth / img.naturalHeight;
      const renderedRatio = rect.width / rect.height;
      if (getComputedStyle(img).objectFit === "fill" && Math.abs(renderedRatio / naturalRatio - 1) > 0.06) {
        issue(img, {
          category: "image-distortion",
          severity: "medium",
          problem: "Image aspect ratio differs from its intrinsic ratio.",
          expected: `Rendered ratio remains close to ${naturalRatio.toFixed(2)}`,
          actual: `Rendered ratio is ${renderedRatio.toFixed(2)}`,
          probableCause: "Both width and height are constrained while object-fit remains fill.",
          suggestedFix: "Preserve aspect ratio or use the intended object-fit value.",
          acceptance: ["Image is not stretched", "Intended crop remains correct"],
          confidence: "high",
          regressionRisk: "low",
        });
      }
    }

    return findings.slice(0, 100);
  });
}

function toMarkdown(report: Record<string, unknown> & { issues: Issue[]; plan: string[] }) {
  const lines = [
    `# Mobile QA ${phase === "retest" ? "retest" : "audit"}`,
    "",
    `- URL: ${report.url}`,
    `- Device: ${report.device}`,
    `- Browser: ${report.browser}`,
    `- Viewport: ${report.viewport}`,
    `- Issues: ${report.issues.length}`,
    "",
    "## Issues",
    "",
  ];
  for (const issue of report.issues) {
    lines.push(
      `### ${issue.id} · ${issue.severity} · ${issue.category}`,
      "",
      `- Component: ${issue.component}`,
      `- Selector: \`${issue.selector}\``,
      `- Problem: ${issue.problem}`,
      `- Actual: ${issue.actual}`,
      `- Evidence: ${issue.evidence.screenshot}`,
      `- Probable cause: ${issue.probableCause}`,
      `- Suggested fix: ${issue.suggestedFix}`,
      "",
    );
  }
  lines.push("## Grouped plan", "", ...report.plan.map((item, index) => `${index + 1}. ${item}`), "");
  return lines.join("\n");
}

async function captureCheckpoint(
  page: Page,
  testInfo: TestInfo,
  issues: Map<string, Issue>,
  pageConfig: PageConfig,
  device: DeviceConfig,
  state: string,
  checkpoint: string,
) {
  const scrollPosition = await page.evaluate(() => Math.round(window.scrollY));
  const filename = `${checkpoint}.png`;
  const screenshotPath = testInfo.outputPath(filename);
  await page.screenshot({ path: screenshotPath, fullPage: false, animations: "disabled" });
  const raw = await inspectViewport(page);
  for (const finding of raw) {
    const key = `${pageConfig.url}|${device.id}|${finding.category}|${finding.component}|${finding.selector}`;
    const existing = issues.get(key);
    if (existing) {
      if (!existing.checkpoints.includes(checkpoint)) existing.checkpoints.push(checkpoint);
      continue;
    }
    issues.set(key, {
      ...finding,
      id: stableId(key),
      device: device.label,
      viewport: `${device.viewport.width}x${device.viewport.height}`,
      browser: testInfo.project.name.replace("mobile-qa-", ""),
      url: pageConfig.url,
      state,
      scrollPosition,
      evidence: { screenshot: filename },
      checkpoints: [checkpoint],
    });
  }
}

for (const pageConfig of suite.pages) {
  for (const device of suite.devices) {
    test(`${pageConfig.id} · ${device.id}`, async ({ page }, testInfo) => {
      await page.setViewportSize(device.viewport);
      await page.emulateMedia({ reducedMotion: pageConfig.motion ?? suite.defaults.motion });

      const diagnostics = { consoleErrors: [] as string[], pageErrors: [] as string[], failedRequests: [] as string[] };
      page.on("console", (message) => {
        if (message.type() === "error" && !/ERR_ABORTED|favicon/i.test(message.text())) {
          const location = message.location();
          const source = location.url ? ` (${location.url}:${location.lineNumber ?? 0})` : "";
          diagnostics.consoleErrors.push(`${message.text()}${source}`);
        }
      });
      page.on("pageerror", (error) => diagnostics.pageErrors.push(String(error)));
      page.on("requestfailed", (request) => {
        const value = `${request.method()} ${request.url()} — ${request.failure()?.errorText ?? "failed"}`;
        if (!/ERR_ABORTED|cancelled|favicon/i.test(value)) diagnostics.failedRequests.push(value);
      });

      const response = await page.goto(pageConfig.url, { waitUntil: "domcontentloaded" });
      expect(response?.status(), "page response").toBeLessThan(400);
      await stabilize(page, pageConfig);

      const issues = new Map<string, Issue>();
      const checkpoints: { id: string; scrollPosition: number; state: string }[] = [];
      const dimensions = await page.evaluate(() => ({ scrollHeight: document.documentElement.scrollHeight, viewport: innerHeight }));
      const maxScroll = Math.max(0, dimensions.scrollHeight - dimensions.viewport);
      const step = Math.max(1, Math.round(dimensions.viewport * suite.defaults.scrollStepRatio));
      const positions = [0];
      for (let value = step; value < maxScroll && positions.length < suite.defaults.maxCheckpoints - 1; value += step) {
        positions.push(value);
      }
      if (maxScroll > 0) positions.push(maxScroll);

      for (let index = 0; index < positions.length; index += 1) {
        await page.evaluate((y) => window.scrollTo(0, y), positions[index]);
        await page.waitForTimeout(420);
        const checkpoint = `scroll-${String(index).padStart(3, "0")}`;
        await captureCheckpoint(page, testInfo, issues, pageConfig, device, "scroll", checkpoint);
        checkpoints.push({ id: checkpoint, scrollPosition: positions[index], state: "scroll" });
      }

      const interactionStates = scenarios[pageConfig.scenario].interactionStates as InteractionState[];
      for (const interaction of interactionStates) {
        if (!pageConfig.states.includes(interaction.id)) continue;
        await interaction.prepare(page);
        await page.waitForTimeout(420);
        const checkpoint = `state-${interaction.id}`;
        await captureCheckpoint(page, testInfo, issues, pageConfig, device, interaction.id, checkpoint);
        checkpoints.push({
          id: checkpoint,
          scrollPosition: await page.evaluate(() => Math.round(window.scrollY)),
          state: interaction.id,
        });
      }

      for (const [category, entries] of Object.entries({
        "console-error": diagnostics.consoleErrors,
        "page-error": diagnostics.pageErrors,
        "failed-request": diagnostics.failedRequests,
      })) {
        entries.forEach((actual, index) => {
          const key = `${pageConfig.url}|${device.id}|${category}|${actual}`;
          issues.set(key, {
            id: stableId(key),
            category,
            severity: category === "page-error" ? "blocker" : "high",
            component: "window",
            selector: "window",
            problem: category.replaceAll("-", " "),
            expected: "No critical browser diagnostics",
            actual,
            probableCause: "Runtime, hydration, resource, or application error requires source-level investigation.",
            suggestedFix: "Trace the diagnostic to its source and rerun the same checkpoint.",
            acceptance: ["Diagnostic no longer occurs", "Critical flow still completes"],
            confidence: "high",
            regressionRisk: "medium",
            device: device.label,
            viewport: `${device.viewport.width}x${device.viewport.height}`,
            browser: testInfo.project.name.replace("mobile-qa-", ""),
            url: pageConfig.url,
            state: "diagnostics",
            scrollPosition: 0,
            evidence: { screenshot: checkpoints[0]?.id ? `${checkpoints[0].id}.png` : "" },
            checkpoints: [`diagnostic-${index}`],
          });
        });
      }

      const sortedIssues = [...issues.values()].sort(
        (a, b) => severityRank(a.severity) - severityRank(b.severity) || a.id.localeCompare(b.id),
      );
      const rootCauseMap = new Map<string, string[]>();
      for (const issue of sortedIssues) {
        const group = rootCauseMap.get(issue.probableCause) ?? [];
        group.push(issue.id);
        rootCauseMap.set(issue.probableCause, group);
      }
      const rootCauseGroups = [...rootCauseMap].map(([probableCause, issueIds]) => ({
        probableCause,
        issueIds,
      }));
      const plan = [...new Set(sortedIssues.map((issue) => issue.suggestedFix))];
      const report = {
        schemaVersion: 1,
        phase,
        visualReviewStatus: "pending-agent-review",
        url: pageConfig.url,
        page: pageConfig.id,
        device: device.label,
        viewport: `${device.viewport.width}x${device.viewport.height}`,
        browser: testInfo.project.name.replace("mobile-qa-", ""),
        states: pageConfig.states,
        criticalFlows: pageConfig.criticalFlows,
        checkpoints,
        diagnostics,
        issues: sortedIssues,
        rootCauseGroups,
        plan,
      };

      await writeFile(testInfo.outputPath("report.json"), JSON.stringify(report, null, 2));
      await writeFile(testInfo.outputPath("report.md"), toMarkdown(report));
      await testInfo.attach("mobile-qa-report", {
        body: JSON.stringify(report, null, 2),
        contentType: "application/json",
      });
    });
  }
}
