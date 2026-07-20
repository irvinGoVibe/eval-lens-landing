# Physical iPhone control modes

## Manual Safari

Use this when the user needs direct control.

1. Run `iphone-session.mjs manual --port <port>`.
2. Give the returned LAN URL to the user.
3. Keep the Mac and iPhone on the same Wi-Fi; disable VPN only if LAN access fails.
4. Use Safari Web Inspector from the Mac when console, network, or computed styles are needed without taking WebDriver control.

The Mac's LAN IP can change after reconnecting Wi-Fi. Never reuse an old IP without running the helper again.

## Apple WebDriver automation

Use this when Codex must operate and measure the physical phone.

Prerequisites on the iPhone:

- trusted/paired with the Mac and unlocked;
- Settings > Apps > Safari > Advanced > Web Inspector enabled;
- Settings > Apps > Safari > Advanced > Remote Automation enabled.

Start the helper in a PTY:

```sh
node .agents/skills/debug-physical-iphone/scripts/iphone-session.mjs automate \
  --port <app-port> \
  --driver-port <free-driver-port>
```

Optional flags:

- `--url http://<host>:<port>/` to override LAN discovery;
- `--device <UDID>` to select a specific paired iPhone;
- `--driver-port <port>` when the default is already occupied.

The helper prints JSON containing `webdriverUrl`, `sessionId`, `targetUrl`, and capabilities. It stays alive to own the session. Use those values for WebDriver commands.

For the existing project capture helper:

```sh
cd web
SAFARI_SESSION_ID=<session-id> \
SAFARIDRIVER_URL=<webdriver-url> \
REAL_SAFARI_ORIGIN=<target-origin> \
node tests/real-safari/live-capture.mjs / <artifact-slug>
```

## Release protocol

Apple does not allow manual interaction with the WebDriver automation window. To restore user control:

1. Send `Ctrl+C` to the PTY running `iphone-session.mjs automate`.
2. Wait for `{"status":"released"...}`.
3. Give the user the normal LAN URL to open in a regular Safari tab.

Do not disable Web Inspector or Remote Automation merely to release a session. Do not close or manipulate the user's personal Safari tabs.

## Failure routing

- `passcodeRequired: true`: ask the user to unlock the iPhone, then retry.
- No paired device: ask the user to reconnect USB/Wi-Fi pairing and trust the Mac.
- Target unreachable from Mac: verify the test server and port before investigating the phone.
- Target works on Mac but not iPhone: verify same Wi-Fi, macOS firewall, VPN, and current LAN IP.
- Driver port occupied: choose another driver port; do not kill an unknown process.
- WebDriver commands freeze during a scroll scene: capture the last responsive state, release the session, and inspect main-thread work, viewport units, sticky bounds, video seeks, filters, and layout reads in Playwright WebKit.
