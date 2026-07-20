# Real Safari and BrowserStack verification

## Boundaries

Playwright WebKit is the mandatory automated compatibility layer. It uses the WebKit engine but is not the shipping macOS Safari application and does not reproduce every iOS device, GPU, media, font, keyboard, or operating-system behavior.

No official Apple or OpenAI Safari MCP is configured for this project. Do not install an unverified community Safari MCP. On macOS, use Apple's bundled `safaridriver` or manual Safari Web Inspector for real-Safari follow-up.

Official sources:

- Apple WebDriver: https://developer.apple.com/documentation/webkit/testing-with-webdriver-in-safari
- Microsoft Playwright MCP: https://github.com/microsoft/playwright-mcp
- BrowserStack MCP: https://www.browserstack.com/docs/browserstack-mcp-server/overview

## Manual Safari Web Inspector workflow

1. Build and start the isolated test target through the Playwright workflow on 3405. Do not use port 3000 or replace the dev server on 3005.
2. In Safari, enable **Settings > Advanced > Show features for web developers** if the Develop menu is absent.
3. Open `http://127.0.0.1:3405` in Safari.
4. Use **Develop > Show Web Inspector**. Check Console, Network failures, computed layout, stacking contexts, and responsive design mode.
5. Repeat on a physical iPhone through **Develop > <device> > <page>** after enabling Web Inspector on the phone and trusting the Mac.
6. Capture the exact Safari/iOS version, device, route, viewport/orientation, and screenshot in the finding.

`/usr/bin/safaridriver` is the official automation bridge. Enabling automation can change a macOS security setting and may require an administrator prompt, so do not run `safaridriver --enable` without the user's action-time approval.

## Physical iPhone automation

This repository includes a dependency-free WebDriver client for Apple's bundled
`safaridriver`. It opens an isolated automation window on a paired physical
iPhone, navigates to the LAN-visible local site, captures a screenshot and DOM,
and records viewport, overflow, touch-target, and form-font diagnostics.

1. Connect and unlock the iPhone, trust the Mac, and enable both **Web Inspector**
   and **Remote Automation** under **Settings > Apps > Safari > Advanced**.
2. Check connectivity without changing the server:

   ```sh
   cd web && pnpm test:safari:iphone:doctor
   ```

3. If Apple WebDriver has never been enabled on this Mac, the user must run and
   authorize this one-time command themselves:

   ```sh
   /usr/bin/safaridriver --enable
   ```

4. Run the real-device capture against the user-owned server on port 3005:

   ```sh
   cd web && pnpm test:safari:iphone
   ```

   Override discovery when necessary with `REAL_SAFARI_URL` and
   `REAL_SAFARI_DEVICE_UDID`. Artifacts are written to
   `web/test-results/real-safari/` and must not be committed.

Safari WebDriver uses an isolated automation window and does not expose the
user's personal tabs or browsing data. Classic WebDriver does not provide a
complete console/network event stream; keep Safari Web Inspector open for those
diagnostics. Do not describe this command as Safari MCP.

## Optional BrowserStack

BrowserStack is not active until the user supplies account credentials through the environment. Never write credentials to `.env`, TOML, source code, fixtures, or reports.

Required environment variables:

```sh
export BROWSERSTACK_USERNAME="..."
export BROWSERSTACK_ACCESS_KEY="..."
export BROWSERSTACK_URL="https://public-or-tunneled-test-url.example"
```

Optional device selectors:

```sh
export BROWSERSTACK_DEVICE="iPhone 15"
export BROWSERSTACK_OS_VERSION="17"
export BROWSERSTACK_LOCAL="true"
```

Run the credential-gated smoke script with `cd web && pnpm test:browserstack:iphone`. For a localhost URL, start the official BrowserStack Local tunnel separately and keep `BROWSERSTACK_LOCAL=true`; do not expose the local server directly to the public internet.

The official BrowserStack MCP can be added later, after credentials are provided, with a project config equivalent to:

```toml
[mcp_servers.browserstack]
command = "npx"
args = ["-y", "@browserstack/mcp-server@1.2.28"]
env_vars = ["BROWSERSTACK_USERNAME", "BROWSERSTACK_ACCESS_KEY"]
startup_timeout_sec = 30
```

The MCP is under active development, requires account permissions, can launch paid cloud sessions, and is not needed for the local Playwright matrix. Confirm account scope and cost before invoking tools that create sessions.
