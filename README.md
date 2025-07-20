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
`npm run android:emulator:list`
2. Start your emulator:
`npm run android:emulator:start:default`
3. Wait for the emulator to fully boot up. You can check if it's ready with:
`npm run android:wait-for-device`

### App Setup (TBD)
1. Install test app:
``
2. Uninstall test app:
``
