---
name: debug-physical-iphone
description: Open and debug this project's local web app on a physical iPhone over the same Wi-Fi network, discover the current LAN URL, verify the connected device, switch safely between user-controlled Safari and Apple WebDriver automation, run scroll/touch/layout checks, and release Safari after automation. Use when the user mentions testing on their phone, real iPhone Safari, Wi-Fi/LAN preview, connected iPhone, Remote Automation, safaridriver, watching Codex operate the phone, or being unable to control Safari while automation is enabled.
---

# Debug Physical iPhone

Use a real iPhone as a separate verification layer after Playwright WebKit. Keep manual and automated control mutually exclusive and make the active mode explicit to the user.

## Prepare

1. Read `PROJECT-ENTRYPOINT.md`, `CLAUDE.md`, `AGENTS.md`, and `wiki/processes/process.md`.
2. Read `.agents/skills/safari-compatibility-audit/SKILL.md` before diagnosing or fixing Safari compatibility.
3. Do not start, stop, or restart the user-owned server on 3005. Never use port 3000.
4. Use an existing isolated test server when available. Build/start another isolated production server only when the user requested verification and repository rules permit it.
5. Run the bundled doctor with the actual test port:

   ```sh
   node .agents/skills/debug-physical-iphone/scripts/iphone-session.mjs doctor --port 3405
   ```

## Choose the control mode

- Choose **manual** when the user wants to touch, scroll, type, or explore personally.
- Choose **automated** when Codex must navigate, execute JavaScript, measure DOM/layout, or capture repeatable states while the user watches.
- Never imply that both parties can control the same Safari automation window simultaneously. Apple WebDriver blocks manual interaction by design.
- If the user says they cannot control the phone, stop the automation process immediately and return the current manual URL.

Read [references/control-modes.md](references/control-modes.md) for exact commands and cleanup rules.

## Manual mode

Run:

```sh
node .agents/skills/debug-physical-iphone/scripts/iphone-session.mjs manual --port 3405
```

Give the printed `http://<current-lan-ip>:<port>/` URL to the user. Confirm that the iPhone and Mac are on the same Wi-Fi. Do not start `safaridriver` in this mode.

## Automated mode

Start the helper in a PTY and keep its process/session handle:

```sh
node .agents/skills/debug-physical-iphone/scripts/iphone-session.mjs automate --port 3405 --driver-port 4450
```

Tell the user before taking control. Parse the printed WebDriver URL and session ID, then use WebDriver commands or the existing `web/tests/real-safari/live-capture.mjs` helper. Treat the automation window as isolated from the user's normal Safari tabs.

Always send `Ctrl+C` to the helper when the automated check finishes. Wait for the `released` message before telling the user that manual control is restored. Do not leave an automation session active across an idle handoff.

## Diagnose and verify

1. Capture the route, iPhone model, Safari/iOS version, layout viewport, visual viewport, and orientation.
2. Reproduce the exact interaction with a small number of deterministic scroll/touch states.
3. Record fixed/sticky bounds, horizontal overflow, undersized targets, form font sizes, console/page errors available through the chosen layer, and screenshot evidence.
4. Identify the source before editing. Do not hide overflow globally or call Playwright WebKit identical to shipping Safari.
5. After a fix, rerun the scenario in Chromium and Playwright WebKit, then on the physical iPhone.
6. Release automation and provide the current manual LAN URL for user acceptance testing.

## Report

State:

- active mode and whether the phone has been released;
- exact LAN URL and port;
- physical device/Safari version;
- reproduced symptom and root cause;
- Chromium, WebKit, and physical-iPhone results;
- remaining Safari WebDriver limitations, especially incomplete console/network logs.
