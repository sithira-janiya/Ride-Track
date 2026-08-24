# Developer Guide

## 1. Project Overview & Tech Stack

RideTrack is a React Native mobile application built with Expo SDK 54 for public transit and bus tracking in Sri Lanka. The app is designed to support commuters with live bus tracking, route search, ETA updates, ticket/pass access, and user travel history.

### Core technologies

- React Native + Expo SDK 54
- Expo Go for local testing and rapid development
- React Navigation for screen and app flow management
- Redux Toolkit or Zustand for global state
- Axios for API requests
- Expo Location for GPS and live positioning
- Optional map libraries such as react-native-maps or Mapbox
- AsyncStorage or MMKV for local persistence
- Expo Notifications for alerts and arrival reminders

### App goals

- Provide live bus arrival and route awareness
- Support route search and timetable viewing
- Improve commuter planning for urban transit users
- Offer digital ticket/pass management and travel history
- Keep the app lightweight, fast, and Expo-compatible

## 2. Getting Started & Local Environment Setup

### Recommended toolchain

- Node.js: 18 LTS or newer
- npm: latest compatible version
- Expo CLI: included via local project dependency
- Git: for branching and team collaboration

### NVM recommendation

If you use Node version managers, install and switch to a stable LTS version:

```bash
nvm install 18
nvm use 18
```

You can also verify your version with:

```bash
node -v
npm -v
```

### Install dependencies

From the project root:

```bash
npm install
```

### Run the app locally

Start the Expo development server:

```bash
npx expo start
```

For a clean Metro cache:

```bash
npx expo start --clear
```

For tunnel mode (useful when testing over network or remote devices):

```bash
npx expo start --tunnel -c
```

### Test using Expo Go

#### iOS

1. Install Expo Go from the App Store.
2. Open the Expo Go app.
3. Scan the QR code shown in the terminal.
4. The app will load directly from the Metro bundler.

#### Android

1. Install Expo Go from the Google Play Store.
2. Open Expo Go.
3. Scan the QR code shown in the terminal.
4. Ensure the device and computer are on the same network or use tunnel mode.

### Common local issues

- If the QR code does not appear, ensure Metro is running.
- If the app fails to load, run `npx expo start --clear`.
- If you are testing across a network, prefer `npx expo start --tunnel`.
- If native dependencies were changed, reinstall with `npx expo install --fix`.

## 3. Folder Architecture Explanation

The project is organized into feature and layer-based folders for easier maintenance.

### `assets/`

Stores static assets such as icons, splash images, and auth/branding images.

Typical contents:

- `assets/icon.png`
- `assets/splash-icon.png`
- `assets/favicon.png`
- `assets/auth/hero-forest.jpg`
- `assets/auth/hero-mountains.jpg`

### `src/components/`

Reusable UI pieces used by multiple screens.

Examples:

- `AuthHeader.js`
- `AuthInput.js`
- `GlassCard.js`
- `LegalModal.js`

Keep components small, focused, and independent from screen logic.

### `src/screens/`

Screen-level components that represent each page or user flow.

Examples:

- `Auth/GreetingScreen.js`
- `Auth/SignInScreen.js`
- `Auth/SignUpScreen.js`
- `Home/HomeScreen.js`

Each screen should be responsible for UI structure and user interaction, while business logic is delegated to hooks or services.

### `src/navigation/`

Contains all navigation configuration.

Examples:

- `AuthNavigator.js`
- `MainNavigator.js`
- `RootNavigator.js`

This layer decides whether the user sees the auth flow or the app flow based on authentication state.

### `src/services/`

Handles external integrations such as API calls, auth requests, and backend communication.

Examples:

- auth service calls
- route service calls
- ticket or trip data fetching

Keep service logic separate from UI code to avoid bloated screens.

### `src/hooks/`

Custom hooks encapsulate logic for reusable behaviors and stateful operations.

Examples:

- `useSignIn.js`
- `useSignUp.js`

Prefer hooks when logic includes async requests, form state, validation, or side effects.

### `src/utils/`

Utility modules for shared functions, formatters, validation helpers, and app-level helpers.

Examples:

- distance calculations
- date formatting
- route label formatting
- validation helpers

### `src/constants/`

Stores static app constants such as colors, spacing, font metadata, and auth labels.

Examples:

- `colors.js`
- `spacing.js`
- `typography.js`
- `Auth/AuthConstants.js`

Keep shared values centralized to improve consistency and scalability.

## 4. Coding & Style Guidelines

### Functional components

Prefer function components and modern JavaScript/TypeScript patterns.

```js
export default function GreetingScreen({ navigation }) {
  return <Text>Welcome</Text>;
}
```

Use ES6+ features such as:

- destructuring
- arrow functions
- template strings
- array methods like `map`, `filter`, `reduce`
- optional chaining and nullish coalescing when appropriate

### TypeScript

If the project adopts TypeScript later, prefer typed props, state, and return values for better maintainability.

Example:

```ts
type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};
```

### Clean code principles

- Keep each file focused on one concern
- name files and functions clearly
- avoid deeply nested logic inside UI components
- break large screens into smaller components
- separate business logic from rendering logic
- use custom hooks for reused logic

### Styling approach

Use `StyleSheet` from React Native as the default styling strategy for this project.

Example:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
```

This project currently favors native styles over Tailwind or NativeWind unless the team explicitly adopts a utility-first approach later.

Recommended styling guidance:

- keep style names semantic and consistent
- prefer theme tokens from `src/constants`
- reuse spacing and color constants instead of hard-coded values
- keep layout responsive with safe-area handling and flexible sizing

### Hook usage guidance

Place reusable logic in custom hooks instead of embedding state and side effects directly in screens.

Examples:

- form validation
- async auth actions
- route data loading
- geolocation state management

## 5. Environment Variables & API Key Handling

Environment variables are important for keys and configuration values such as:

- Google Maps API key
- backend URL
- Firebase config
- push notification credentials
- bus data provider endpoints

### Recommended approach

Create a `.env` file in the project root and add values there.

Example:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
```

### Important note

Expo uses `EXPO_PUBLIC_` prefix for variables exposed to the client app.

Use values like:

```js
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
```

### Security practices

- never commit `.env` files to Git
- include `.env` in `.gitignore`
- keep secret keys out of source code and public repos
- store production secrets in a secure secret manager or backend proxy if needed

### Example `.gitignore` entry

```gitignore
.env
.env.*
```

### API configuration best practices

- centralize API URLs in a config module or environment helper
- validate missing env values during startup
- keep endpoints versioned when possible
- use a single axios instance for all requests

## Summary

This guide is meant to help the team build and maintain the RideTrack app in a clean, scalable, and Expo-compatible way. Follow the folder boundaries, keep rendering and logic separated, and protect sensitive configuration using environment variables.

For future modules, continue to build with maintainability, responsiveness, and commuter usability in mind.
