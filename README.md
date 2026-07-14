# Table of Contents

- [Installation](#installation)
- [Run on Android](#run-on-android)
  - [Quick Usage](#quick-usage)
  - [Detailed Usage](#detailed-usage)
  - [Reports](#reports)
  - [Troubleshooting](#troubleshooting)
- [Run on iOS](#run-on-ios)
  - [Quick Usage (iOS)](#quick-usage-ios)
  - [Detailed Usage (iOS)](#detailed-usage-ios)
  - [Reports (iOS)](#reports-ios)
  - [Notes (iOS)](#notes-ios)

# Installation (MacOS)

1. Clone the repository
2. Give system access to scripts dir
```bash
chmod +x .scripts/
```
3. Install Maestro (**2.x required** for the Maestro Viewer / MCP integration)
```bash
brew tap mobile-dev-inc/tap
brew install maestro
```
The npm scripts invoke `$HOME/.maestro/bin/maestro`; if you installed via Homebrew only, symlink it:
```bash
mkdir -p $HOME/.maestro/bin && ln -sf /opt/homebrew/bin/maestro $HOME/.maestro/bin/maestro
```

# Run on Android

## Quick Usage
1. Perform env cleanup
```bash
npm run env:cleanup
```
2. Perform env setup
```bash
npm run env:setup
```
3. Run the tests
```bash
npm run maestro:test:wikipedia
```
4. Perform env teardown
```bash
npm run env:teardown
```
### IMPORTANT
It is suggested to perform env cleanup before each run to avoid any potential issues with ports, processes and emulators.
So please repeat the cycle for the most optimal experience.

Optional:
- Run Maestro Studio for element inspection (this will open Maestro Studio in your default browser on port 9999)
```bash
npm run maestro:inspect
```
- Open report
```bash
npm run report:open
```
- Open AI report
```bash
npm run report:ai:open
```
- Record a test (this example will record a test for the `LaunchStepper` spec and save it to the `recordings` dir)
```bash
npm run maestro:record:wikipedia
```

## Detailed Usage
1. Get the app apk (download the latest build from the dev branch / ask your dev team on how to get it)
2. Start an Android emulator
```bash
npm run maestro:device:start:android
```
3. Install the app
```bash
npm run android:install:wikipedia (replace 'wikipedia' with your app apk)
```
4. Run tests
```bash
npm run maestro:test:wikipedia (adjust paths for .maestro/flows and .maestro/configs with your own settings)
```
5. Uninstall the app
```bash
npm run android:uninstall:wikipedia (replace 'wikipedia' with your app apk)
```
6. Stop the emulator
```bash
npm run maestro:device:stop
```

## Reports
1. Delete old reports
```bash
npm run report:delete
```
2. Open report
```bash
npm run report:open
```
3. Open AI report
```bash
npm run report:ai:open
```

## IMPORTANT
It is strongly suggested to kill the ports, processes and emulators manually (e.g. if your emulator/app is frozen or if you're done with the day and logging off):
```bash
npm run kill:ports
npm run kill:processes
npm run kill:emulators
```

## Troubleshooting
### "App not installed" error
If you have Maestro Studio open and are trying to run the tests, you might get an "App not installed" error. 
This is because Maestro Studio is using the same emulator as the tests. 
To fix this, you need to close Maestro Studio and run the tests again.
- (Original workaround message on GitHub)[https://github.com/mobile-dev-inc/Maestro/issues/1104#issuecomment-1872975969]

# Run on iOS

Requirements: macOS with Xcode (incl. iOS simulators) installed. The app under test is the official
Wikipedia iOS simulator build (`org.wikimedia.wikipedia`) from Maestro's samples bucket. It lives at
`apps/ios/wikipedia/wikipedia.zip` (tracked in Git LFS); the unpacked `Wikipedia.app` is generated
and gitignored. If the zip is missing (or is an un-pulled LFS pointer), setup re-downloads it automatically.

## Quick Usage (iOS)
1. Perform env cleanup (shuts down + factory-resets the simulator, kills ports/processes, deletes artifacts)
```bash
npm run env:cleanup:ios
```
2. Perform env setup (ensures the app build is present, boots the simulator, installs the app)
```bash
npm run env:setup:ios
```
3. Run the tests (writes an HTML report to `test-results/wikipedia-ios.html`)
```bash
npm run maestro:test:wikipedia:ios
```
4. Serve the report on port 2077 (or `npm run report:open:ios` to open the file directly)
```bash
npm run report:serve:ios
```
5. Perform env teardown (uninstall app + stop simulator), or run `env:cleanup:ios` for a fully clean slate
```bash
npm run env:teardown:ios
```
### IMPORTANT
Like on Android, perform `env:cleanup:ios` before each run — it factory-resets the simulator so every run
starts from a brand-new clean environment. Repeat the cycle cleanup → setup → test → report → teardown.

Alternatively, run the whole cycle (setup → test → teardown) in one shot:
```bash
npm run test:ios
```

## Detailed Usage (iOS)
1. Download/unpack the app build (no-op when already present)
```bash
npm run ios:download:wikipedia
```
2. Start the iOS simulator (default: iPhone 16 Pro; override with `IOS_SIMULATOR_NAME="iPhone 16"`)
```bash
npm run maestro:device:start:ios
```
3. Install the app
```bash
npm run ios:install:wikipedia
```
4. Run tests
```bash
npm run maestro:test:wikipedia:ios
```
5. Uninstall the app
```bash
npm run ios:uninstall:wikipedia
```
6. Stop the simulator
```bash
npm run maestro:device:stop:ios
```
7. (Optional) Factory-reset the simulator
```bash
npm run ios:erase:simulator
```

## Reports (iOS)
- `npm run report:serve:ios` — serves `test-results/wikipedia-ios.html` at http://localhost:2077/
- `npm run report:open:ios` — opens the HTML report directly

## Recordings (iOS, failures only)
`npm run record:all:ios` runs every iOS flow via `maestro record` and keeps `.mp4` videos **of failed flows only**
in `recordings/` (named `{flowName}-failed.mp4`); recordings of passed flows are discarded. The custom
recordings report (`report:generate` → `test-results/test-report.html`, also reachable while `report:serve:ios`
is running at http://localhost:2077/test-results/test-report.html) picks these videos up automatically.
Note: recording re-runs the flows (Maestro has no local "record during test" flag), so use it as a separate
evidence-gathering pass after/instead of `maestro:test:wikipedia:ios`.

## Maestro Viewer (live execution in the browser)
The Maestro MCP server (registered in `.mcp.json`, requires **Maestro CLI 2.x**) hosts the **Maestro Viewer** —
a web app showing the live device screen, current flow commands, and tool activity — pinned in this repo to
**http://127.0.0.1:10001/** via `--viewer-port 10001` (by default Maestro picks the first free port in 9999–11000).
It is only up while an MCP session is active (e.g. Claude Code / VS Code with the maestro MCP server running) and
shows MCP-driven executions; for plain CLI runs use Maestro Studio instead (`npm run maestro:inspect`, port 9999).
After changing `.mcp.json`, reload the IDE window so the MCP server restarts with the new args.

## Notes (iOS)
- iOS flows live in `.maestro/flows/wikipedia/ios/` with iOS page objects in `.maestro/src/pages/ios/`
  (iOS uses accessibility ids/labels, not Android resource-ids), driven by `.maestro/config.ios.yaml`.
- `Third Flow.spec.yaml` fails **on purpose** (same demo convention as Android), so the suite exit code is non-zero by design.
- The "App not installed"/driver-connection issue from the Android troubleshooting section applies to iOS too:
  close Maestro Studio (and any other running Maestro instance, e.g. an MCP session) before running tests,
  otherwise flows may fail with `Failed to connect to /127.0.0.1:7001`.