import * as SecureStore from 'expo-secure-store';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  createdAt: string;
};

type AuthSession = {
  user: AuthUser;
  token: string;
};

const TOKEN_KEY = 'ridetrack_auth_token';
const USER_KEY = 'ridetrack_auth_user';
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

const normalizeIdentifier = (value: string) => value.trim();

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidMobile = (value: string) => /^\+?[0-9]{9,15}$/.test(value.trim());

type AuthResponse = {
  message?: string;
  user?: AuthUser;
  token?: string;
};

async function requestAuth(path: string, body: Record<string, string>): Promise<AuthSession> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/auth/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(`Unable to reach the RideTrack server at ${API_URL}. Start the backend and try again.`);
  }

  let payload: AuthResponse;

  try {
    payload = (await response.json()) as AuthResponse;
  } catch (error) {
    throw new Error('The RideTrack server returned an invalid response.');
  }

  if (!response.ok || !payload.user || !payload.token) {
    throw new Error(payload.message || 'Authentication failed.');
  }

  await saveAuthSession(payload.user, payload.token);
  return { user: payload.user, token: payload.token };
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

  return requestAuth('login', { identifier: emailOrMobile, password: securePassword });
}

export async function register(
  fullName: string,
  email: string,
  mobile: string,
  password: string
): Promise<AuthSession> {
  const cleanedFullName = fullName.trim();
  const cleanedEmail = email.trim();
  const cleanedMobile = mobile.trim();
  const cleanedPassword = password.trim();

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

  return requestAuth('register', {
    fullName: cleanedFullName,
    email: cleanedEmail,
    mobile: cleanedMobile,
    password: cleanedPassword,
  });
}
