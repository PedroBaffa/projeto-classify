import { useEffect, useState } from 'react';

export function useMockData() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mock-data')
      .then((r) => r.json())
      .then((json) => {
        setData(json || {});
        setLoading(false);
      })
      .catch(() => {
        setData({});
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
