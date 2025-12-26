// entrypoints/content.ts
type ContentPing = { type: 'PING_CONTENT' };

export default defineContentScript({
  matches: ['https://example.com/*'],
  runAt: 'document_idle',
  main() {
    const id = 'wxt-base-banner';
    const existing = document.getElementById(id);
    if (!existing) {
      const el = document.createElement('div');
      el.id = id;
      el.textContent = 'Hello from WXT Content Script';
      Object.assign(el.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: '2147483647',
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '6px 10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      });
      document.documentElement.appendChild(el);
    }

    browser.runtime.onMessage.addListener(
      (
        message: ContentPing,
        _sender: browser.Runtime.MessageSender,
        sendResponse: (response: unknown) => void,
      ) => {
        if (message?.type !== 'PING_CONTENT') return false;
        const el = document.getElementById(id);
        if (el) el.textContent = `Pinged at ${new Date().toLocaleTimeString()} (${location.href})`;
        sendResponse({ ok: true, from: 'content', href: location.href });
        return false; // 同期応答なので false
      },
    );
  },
});
