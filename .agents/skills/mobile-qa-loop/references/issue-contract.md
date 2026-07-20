# Mobile QA issue contract

## Atomic finding

Every issue must contain:

```yaml
id: MOBILE-<stable-id>
severity: blocker | high | medium | low
device: <profile>
viewport: <width>x<height>
browser: chromium | webkit | physical-safari
url: <route>
state: <state>
scroll_position: <css-px>
component: <stable component/root>
selector: <stable selector>
problem: <one observable defect>
evidence:
  screenshot: <path>
expected: <verifiable behavior>
actual: <measured behavior>
probable_cause: <root-cause hypothesis>
suggested_fix: <smallest appropriate correction>
acceptance:
  - <same checkpoint passes>
  - <desktop remains valid>
confidence: high | medium | low
regression_risk: high | medium | low
```

## Severity

- `blocker`: the critical flow cannot complete or the page crashes/freezes.
- `high`: required content or action is missing, inaccessible, or obscured.
- `medium`: layout or interaction is visibly broken but the flow remains possible.
- `low`: cosmetic inconsistency with no content/action loss.

## Deduplication

Use a stable key based on route, viewport family, category, component, and selector. Keep all matching checkpoints as evidence on one issue. Do not create separate issues for multiple symptoms produced by the same CSS rule; group them under one probable root cause.

## Root-cause plan

Group issues by probable cause and order changes:

1. global viewport/overflow/safe-area;
2. parent flex/grid/min-width constraints;
3. component responsive layout;
4. typography/wrapping/density;
5. touch, forms, keyboard, sticky/fixed interaction;
6. Safari-specific rendering or performance.

Do not modify code until the page audit is complete. In audit-only mode, stop after the plan.

## Semantic visual comparison

Review content parity, hierarchy, order, visibility, interaction availability, density, and brand consistency. Use pixel diffs only between identical browser/viewport/state baselines, never between desktop and mobile layouts.
