import * as SecureStore from 'expo-secure-store';
import { ClientResponseError } from 'pocketbase';
import { pocketBase } from './pocketBase';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: string;
};

type AuthSession = {
  user: AuthUser;
  token: string;
};

const TOKEN_KEY = 'ridetrack_auth_token';
const USER_KEY = 'ridetrack_auth_user';
const normalizeIdentifier = (value: string) => value.trim();

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidMobile = (value: string) => /^\+?[0-9]{9,15}$/.test(value.trim());

type PocketBaseUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  mobile: string;
  role: string;
  created: string;
};

const toAuthUser = (user: PocketBaseUser): AuthUser => ({
  id: user.id,
  fullName: user.name,
  email: user.email,
  mobile: user.mobile || user.username,
  role: user.role,
  createdAt: user.created,
});

const messageForError = (error: unknown): string => {
  if (error instanceof ClientResponseError) {
    if (error.status === 0) return 'Unable to reach PocketBase. Check EXPO_PUBLIC_POCKETBASE_URL and try again.';
    return error.response?.message || error.message || 'Authentication failed.';
  }

  return error instanceof Error ? error.message : 'Authentication failed.';
};

async function authenticate(identifier: string, password: string): Promise<AuthSession> {
  try {
    const auth = await pocketBase.collection('users').authWithPassword<PocketBaseUser>(identifier, password);
    const user = toAuthUser(auth.record);
    await saveAuthSession(user, auth.token);
    return { user, token: auth.token };
  } catch (error) {
    throw new Error(messageForError(error));
  }
}

export async function saveAuthSession(user: AuthUser, token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
}

export async function getStoredAuthSession(): Promise<AuthSession | null> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const serializedUser = await SecureStore.getItemAsync(USER_KEY);

  if (!token || !serializedUser) {
    return null;
  }

  try {
    const user = JSON.parse(serializedUser) as AuthUser;
    return { user, token };
  } catch (error) {
    await clearAuthSession();
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}

export async function login(identifier: string, password: string): Promise<AuthSession> {
  const emailOrMobile = normalizeIdentifier(identifier);
  const securePassword = password.trim();

  if (!emailOrMobile || !securePassword) {
    throw new Error('Email/mobile and password are required.');
  }

  if (securePassword.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (!isValidEmail(emailOrMobile) && !isValidMobile(emailOrMobile)) {
    throw new Error('Please enter a valid email address or mobile number.');
  }

  return authenticate(emailOrMobile, securePassword);
}

export async function register(
  fullName: string,
  email: string,
  mobile: string,
  password: string,
  role: string
): Promise<AuthSession> {
  const cleanedFullName = fullName.trim();
  const cleanedEmail = email.trim();
  const cleanedMobile = mobile.trim();
  const cleanedPassword = password.trim();
  const cleanedRole = role.trim();

  if (!cleanedFullName) {
    throw new Error('Full name is required.');
  }

  if (!isValidEmail(cleanedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!isValidMobile(cleanedMobile)) {
    throw new Error('Please enter a valid mobile number.');
  }

  if (cleanedPassword.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (!cleanedRole) {
    throw new Error('Please select a role.');
  }

  try {
    await pocketBase.collection('users').create({
      name: cleanedFullName,
      email: cleanedEmail,
      username: cleanedMobile,
      mobile: cleanedMobile,
      password: cleanedPassword,
      passwordConfirm: cleanedPassword,
      role: cleanedRole,
    });
  } catch (error) {
    throw new Error(messageForError(error));
  }

  return authenticate(cleanedEmail, cleanedPassword);
}
