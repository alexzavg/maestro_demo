# Maestro Demo


## Table of Contents
- [Installation](#installation)
  - [macOS/Linux/Windows (WSL)](#macoslinuxwindows-wsl)
  - [macOS (Homebrew)](#macos-homebrew)
- [Android Setup](#android-setup)
  - [Emulator Setup](#emulator-setup)
  - [Emulator Launch](#emulator-launch)
  - [App Setup](#app-setup)

## Installation
### macOS/Linux/Windows (WSL)
Run the following command to install Maestro:
```bash
curl -fsSL "https://get.maestro.mobile.dev" | bash
```

### macOS (Homebrew)
If you're on macOS, you can use Homebrew:
```bash
brew tap mobile-dev-inc/tap
brew install maestro
```


## Android Setup
### Emulator Setup
You can start the emulator by following this tutorial https://docs.maestro.dev/getting-started/build-and-install-your-app/android

### Emulator Launch
1. List all available Android emulators:
`emulator -list-avds`
2. Start your emulator (replace `Your_Emulator_Name` with your actual emulator name from the list above):
`emulator -avd Your_Emulator_Name -no-boot-anim -no-snapshot-load -wipe-data`
- no-boot-anim: Disables the boot animation for faster startup
- no-snapshot-load: Ensures a clean state
- wipe-data: Clears all data (use this for a fresh start)
3. Wait for the emulator to fully boot up. You can check if it's ready with:
`adb wait-for-device`

### App Setup
1. Install Wikipedia app:
`adb install -t -r -g apps/android/apks/wikipedia.apk`
2. Uninstall Wikipedia app:
`adb uninstall org.wikipedia`
