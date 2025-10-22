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

# Usage (Android)
1. Get the app apk (download the latest build from the dev branch)
2. Start an Android emulator
```bash
npm run maestro:device:start:android
```
3. Install the app
```bash
npm run android:install:wikipedia
```
4. Run the tests
```bash
npm run maestro:test:wikipedia
```
5. Uninstall the app
```bash
npm run android:uninstall:wikipedia
```
6. Stop the emulator
```bash
npm run maestro:device:stop
```

## IMPORTANT
If your emulator/app is frozen, kill the ports, processes and emulators manually with these commands:
```bash
npm run kill:ports
npm run kill:processes
npm run kill:emulators
```