import { useEffect, useState } from 'react';
import { getHelloCount, getInstallDate, resetHelloCount } from '@/utils/storage';

export default function OptionsApp() {
  const [helloCount, setHelloCount] = useState<number>(0);
  const [installDate, setInstallDate] = useState<number | null>(null);

  async function refresh() {
    const [c, d] = await Promise.all([getHelloCount(), getInstallDate()]);
    setHelloCount(c);
    setInstallDate(d);
  }

  async function reset() {
    await resetHelloCount();
    await refresh();
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <h1 style={{ marginTop: 0 }}>WXT Base Options</h1>

      <div style={{ marginTop: 12 }}>
        <div>
          <strong>Hello Count:</strong> {helloCount}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>Install Date:</strong>{' '}
          {installDate ? new Date(installDate).toLocaleString() : '(not set yet)'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={refresh}>Refresh</button>
        <button onClick={reset}>Reset Hello Count</button>
      </div>
    </div>
  );
}

