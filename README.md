# Pinklady

WXT（TypeScript）+ React で構築した Chrome 拡張（MV3）です。

## 機能

- **Popup（React）**: Background / Content Script への Ping 疎通確認、Hello Count の表示
- **Options（React）**: installDate / helloCount の表示・リセット
- **Background（Service Worker）**: Ping 応答、installDate 初期化、Hello Count のインクリメント
- **Content Script**: `https://example.com/*` に簡易バナーを表示、Popup からの Ping に応答
- **Storage**: `storage` permission を使用した永続化（Hello カウンタと installDate）
- **Messaging**: Popup → Background / Popup → Content Script の疎通

## 開発

### セットアップ

```bash
pnpm install
```

### 起動

```bash
pnpm dev
```

WXT が拡張入りブラウザを自動起動します。

### ビルド

```bash
pnpm build
```

ビルド成果物は `.output/chrome-mv3` に出力されます。

## テスト手順

1. `pnpm dev` で拡張入りブラウザが起動
2. 拡張アイコン → Popup で **Ping Background** をクリック → 成功メッセージ表示
3. `https://example.com/` を開く → 右上に「Hello from WXT Content Script」バナーが表示
4. Popup から **Ping Content Script (active tab)** をクリック → 成功メッセージ表示
5. **Increment Hello Count** でカウントが増加
6. 拡張アイコン右クリック → オプション で Options ページを開く → installDate と helloCount が確認可能

## 手動導入（通常の Chrome に導入する場合）

1. `pnpm build` でビルド
2. `chrome://extensions` を開く
3. 右上の「デベロッパーモード」をオン
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. `.output/chrome-mv3` フォルダを選択

※ OS によっては隠しフォルダ（`.output`）を表示する設定が必要です。

## プロジェクト構成

```
pinklady/
├── entrypoints/
│   ├── background.ts          # Service Worker
│   ├── content.ts             # Content Script
│   ├── popup/                 # Popup (React)
│   │   ├── index.html
│   │   ├── main.tsx
│   │   └── App.tsx
│   └── options/               # Options (React)
│       ├── index.html
│       ├── main.tsx
│       └── options-app.tsx
├── styles/
│   └── global.css             # 共通スタイル
├── utils/
│   └── storage.ts             # Storage ユーティリティ
├── public/
│   └── icon/                  # 拡張機能アイコン
├── wxt.config.ts              # WXT 設定
└── package.json
```

## 参考リンク

- [WXT 公式ドキュメント](https://wxt.dev/)
- [WXT Installation](https://wxt.dev/guide/installation.html)
- [WXT Entrypoints](https://wxt.dev/guide/essentials/entrypoints.html)
- [WXT Storage](https://wxt.dev/storage)
