import { create } from 'zustand';

import {
  clearAuthSession,
  getStoredAuthSession,
  login as loginRequest,
  register as registerRequest,
  type AuthUser,
} from '../services/authService';

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, mobile: string, password: string, role: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  hydrate: async () => {
    try {
      const session = await getStoredAuthSession();

      set({
        user: session?.user ?? null,
        token: session?.token ?? null,
        isAuthenticated: Boolean(session),
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: error instanceof Error ? error.message : 'Session restore failed.',
      });
    }
  },

  login: async (identifier: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const session = await loginRequest(identifier, password);

      set({
        user: session.user,
        token: session.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed.',
      });

      return false;
    }
  },

  register: async (fullName: string, email: string, mobile: string, password: string, role: string) => {
    set({ isLoading: true, error: null });

    try {
      const session = await registerRequest(fullName, email, mobile, password, role);

      set({
        user: session.user,
        token: session.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed.',
      });

      return false;
    }
  },

  logout: async () => {
    try {
      await clearAuthSession();
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
