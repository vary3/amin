import { useEffect, useMemo, useState } from 'react';

export default function App() {
  const [bgPing, setBgPing] = useState<string>('');
  const [contentPing, setContentPing] = useState<string>('');
  const [helloCount, setHelloCount] = useState<number>(0);

  const version = useMemo(() => browser.runtime.getManifest().version, []);

  async function pingBackground() {
    try {
      const res = await browser.runtime.sendMessage({ type: 'PING_BG' });
      setBgPing(JSON.stringify(res));
    } catch (e) {
      setBgPing(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  async function incrementHello() {
    try {
      const res = await browser.runtime.sendMessage({ type: 'INC_HELLO' });
      setHelloCount(res?.helloCount ?? helloCount);
    } catch (e) {
      setBgPing(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  async function pingContentScript() {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      setContentPing('No active tab');
      return;
    }
    try {
      const res = await browser.tabs.sendMessage(tab.id, { type: 'PING_CONTENT' });
      setContentPing(JSON.stringify(res));
    } catch (e) {
      setContentPing(
        'tabs.sendMessage failed. Open https://example.com/ (matches) and reload the page, then retry.',
      );
    }
  }

  useEffect(() => {
    // 初期表示時にBG疎通確認だけしておく
    void pingBackground();
  }, []);

  return (
    <div style={{ width: 320, padding: 12 }}>
      <h2 style={{ margin: '0 0 8px' }}>Hello WXT Base</h2>
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 10 }}>v{version}</div>

      <div style={{ display: 'grid', gap: 8 }}>
        <button onClick={pingBackground}>Ping Background</button>
        <button onClick={incrementHello}>Increment Hello Count</button>
        <button onClick={pingContentScript}>Ping Content Script (active tab)</button>
      </div>

      <hr style={{ margin: '12px 0' }} />

      <div style={{ fontSize: 12 }}>
        <div>
          <strong>Hello Count:</strong> {helloCount}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>BG:</strong> {bgPing}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>Content:</strong> {contentPing}
        </div>
      </div>
    </div>
  );
}
