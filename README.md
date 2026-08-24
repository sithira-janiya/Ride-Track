# RideTrack

RideTrack is a modular Expo + React Native app for a bus-tracking and commuter experience. Account registration and authentication use a local PocketBase backend, while the mobile app stores the returned session securely with Expo SecureStore.

## Current status

### Completed

- Expo SDK 54 compatibility and dependency resolution
- Modular React Native project structure with React Navigation
- Responsive RideTrack landing page
- Zustand authentication state with SecureStore session persistence
- Working account creation form with validation and loading/error states
- Registration and login API using PocketBase user persistence and authentication
- Login with email or mobile number and invalid-credential handling
- Duplicate email and mobile number protection
- Backend health checks via PocketBase

### In progress

- Full mobile UI and end-to-end authentication test coverage
- GPS and map-based live bus tracking
- Bus search, routes, schedules, and ETA calculations
- Tickets, profiles, travel history, and notifications

The registration and login flows are functional when the PocketBase backend is running.

## Project structure

- `pocketbase` contains the PocketBase executable and backend database instructions.
- `src/actions` contains legacy Redux action creators retained for reference.
- `src/components` stores reusable UI building blocks.
- `src/constants` centralizes colors, spacing, typography, and app config.
- `src/hooks` contains custom hooks for sign-in and sign-up flows.
- `src/navigation` manages app navigation stacks.
- `src/screens` contains screen-level views.
- `src/services` wraps API and auth requests.
- `src/store/useAuthStore.ts` contains the active Zustand auth store.

## Getting started

```bash
npm install
```

Start PocketBase backend in a separate terminal from the `pocketbase` directory:

```bash
cd pocketbase
./pocketbase serve
```
*(Windows: `./pocketbase.exe serve`)*

Start Expo:

```bash
npm start
```

For tunnel mode with a clean Metro cache:

```bash
npm run start:tunnel
```

To clear the Metro cache without tunnel mode:

```bash
npx expo start --clear
```
