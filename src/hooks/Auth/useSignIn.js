import { useCallback, useState } from 'react';

export default function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useCallback(async (credentials = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Placeholder for authentication logic
      return { ok: true, data: credentials };
    } catch (err) {
      setError(err?.message || 'Sign in failed');
      return { ok: false, error: err?.message || 'Sign in failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { signIn, loading, error };
}
