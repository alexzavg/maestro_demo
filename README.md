# Table of Contents

- [Installation](#installation)
- [Run on Android](#run-on-android)
  - [Quick Usage](#quick-usage)
  - [Detailed Usage](#detailed-usage)
  - [Reports](#reports)
  - [Troubleshooting](#troubleshooting)

# Installation (MacOS)

1. Clone the repository
2. Give system access to scripts dir
```bash
chmod +x .scripts/
```
3. Install Maestro
```bash
brew tap mobile-dev-inc/tap
brew install maestro
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