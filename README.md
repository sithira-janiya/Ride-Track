# RideTrack

RideTrack is a modular Expo + React Native app for a bus-tracking and commuter experience. Account registration uses a local Express API and SQLite database, while the mobile app stores the returned session securely with Expo SecureStore.

## Current status

### Completed

- Expo SDK 54 compatibility and dependency resolution
- Modular React Native project structure with React Navigation
- Responsive RideTrack landing page
- Zustand authentication state with SecureStore session persistence
- Working account creation form with validation and loading/error states
- Express registration and login API with SQLite user persistence and bcrypt password hashing
- Login with email or mobile number and invalid-credential handling
- Duplicate email and mobile number protection
- Backend health endpoint at `GET /api/health`

### In progress

- Full mobile UI and end-to-end authentication test coverage
- GPS and map-based live bus tracking
- Bus search, routes, schedules, and ETA calculations
- Tickets, profiles, travel history, and notifications

The registration and login flows are functional when the backend is running. The backend database is created automatically at `backend/data/ridetrack.db` and is excluded from Git.

## Project structure

- `backend` contains the local Express API and SQLite database setup.
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

Start the backend and Expo together:

```bash
npm start
```

For tunnel mode with a clean Metro cache:

```bash
npm run start:tunnel
```

This single command starts the backend, creates a public API tunnel for port `4000`, injects that API URL into Expo, and starts the Expo native app tunnel. The API creates `backend/data/ridetrack.db` automatically. Keep this terminal open while testing.

The command uses LocalTunnel, so an internet connection is required. It prints the public API URL before starting Expo. No `EXPO_PUBLIC_API_URL` or Windows Firewall configuration is required for this tunnel workflow.

Check the backend separately with:

```bash
curl http://localhost:4000/api/health
```

For tunnel mode and a clean cache:

```bash
npm run start:tunnel
```

To clear the Metro cache without tunnel mode:

```bash
npx expo start --clear
```
