import { useCallback, useState } from 'react';

export default function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = useCallback(async (payload = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Placeholder for registration logic
      return { ok: true, data: payload };
    } catch (err) {
      setError(err?.message || 'Sign up failed');
      return { ok: false, error: err?.message || 'Sign up failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { signUp, loading, error };
}
