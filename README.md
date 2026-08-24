# RideTrack

RideTrack is a modular Expo + React Native app scaffold for a bus-tracking and commuter experience. The project currently includes a responsive landing screen, Redux Toolkit auth state, and a nested auth/main navigation flow.

## Current status

- Expo SDK 54 compatibility has been aligned
- React Native / Expo / React package versions are resolved successfully
- Redux Toolkit auth slice is configured in `src/reducers/Auth/authReducers.js`
- Navigation stack is configured for `Greeting`, `SignIn`, `SignUp`, and `Home`
- Landing page styling is responsive across mobile device sizes

## Project structure

- `src/actions` holds Redux action creators and auth-related actions.
- `src/components` stores reusable UI building blocks.
- `src/constants` centralizes colors, spacing, typography, and app config.
- `src/hooks` contains custom hooks for sign-in and sign-up flows.
- `src/navigation` manages app navigation stacks.
- `src/screens` contains screen-level views.
- `src/services` wraps API and auth requests.
- `src/store.js` configures the Redux store.

## Getting started

```bash
npm install
npx expo start
```

For tunnel mode and a clean cache:

```bash
npx expo start --tunnel -c
```

To clear the Metro cache without tunnel mode:

```bash
npx expo start --clear
```
