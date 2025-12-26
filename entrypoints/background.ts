// entrypoints/background.ts
import { ensureInstallDate, incrementHelloCount, getHelloCount } from '@/utils/storage';

type PingMessage = { type: 'PING_BG' };
type IncMessage = { type: 'INC_HELLO' };
type Message = PingMessage | IncMessage;

export default defineBackground(() => {
  // main 自体は async にできないので、必要な async は IIFE で開始する
  void (async () => {
    await ensureInstallDate();
  })();

  browser.runtime.onMessage.addListener(
    (
      message: Message,
      _sender: browser.Runtime.MessageSender,
      sendResponse: (response: unknown) => void,
    ) => {
      if (message?.type === 'PING_BG') {
        sendResponse({ ok: true, from: 'background', now: Date.now() });
        return false; // 同期応答なので false
      }
      if (message?.type === 'INC_HELLO') {
        // 非同期応答の場合は true を返してチャネルを開いたままにする
        (async () => {
          await incrementHelloCount();
          const count = await getHelloCount();
          sendResponse({ ok: true, helloCount: count });
        })();
        return true; // 非同期応答なので true を返す
      }
      return false;
    },
  );
});
