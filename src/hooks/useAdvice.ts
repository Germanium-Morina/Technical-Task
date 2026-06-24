import { useState, useEffect, useCallback } from 'react';

interface AdviceResponse {
  slip: { id: number; advice: string };
}

export function useAdvice() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAdvice = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://api.adviceslip.com/advice', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error();
      const data: AdviceResponse = await res.json();
      setAdvice(data.slip.advice);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  return { advice, loading, error, refresh: fetchAdvice };
}
