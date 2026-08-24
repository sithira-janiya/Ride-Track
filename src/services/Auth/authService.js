export const authService = {
  signIn: async (credentials = {}) => {
    // Placeholder for API call
    return { ok: true, data: credentials };
  },
  signUp: async (payload = {}) => {
    // Placeholder for API call
    return { ok: true, data: payload };
  },
  signOut: async () => {
    // Placeholder for sign-out call
    return { ok: true };
  },
};

export default authService;
