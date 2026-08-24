import PocketBase from 'pocketbase';

const pocketBaseUrl = process.env.EXPO_PUBLIC_POCKETBASE_URL?.replace(/\/$/, '');

if (!pocketBaseUrl) {
  console.warn('EXPO_PUBLIC_POCKETBASE_URL is not set. PocketBase requests will fail until it is configured.');
}

export const pocketBase = new PocketBase(pocketBaseUrl || 'http://127.0.0.1:8090');

// Requests are initiated by explicit user actions, so cancelling an earlier one
// when a later request starts would be surprising in the auth flow.
pocketBase.autoCancellation(false);
