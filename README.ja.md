# pnpm-catalog-updates

pnpm ワークスペースカタログ依存関係をチェックおよび更新するための強力な CLI ツール。
[npm-check-updates](https://github.com/raineorshine/npm-check-updates)にインスパイアされました。

**📖 完全なドキュメント**: [https://pcu-cli.dev](https://pcu-cli.dev/ja)

**📖 ドキュメント言語**: [English](README.md) | [中文](README.zh-CN.md) |
[日本語](README.ja.md)

[![CI](https://img.shields.io/github/actions/workflow/status/houko/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/houko/pnpm-catalog-updates/actions)
[![npm](https://img.shields.io/npm/v/pnpm-catalog-updates)](https://www.npmjs.com/package/pnpm-catalog-updates)
[![Coverage](https://img.shields.io/coveralls/github/houko/pnpm-catalog-updates/main)](https://coveralls.io/github/houko/pnpm-catalog-updates)

## ✨ 特徴

- 🏗️ **ワンコマンドセットアップ**: `pcu init`で完全なPNPMワークスペースを初期化
- 🔍 **スマート検出**: pnpm ワークスペースとカタログ設定を自動的に検出
- 🎯 **カタログ特化**: pnpm カタログ依存関係管理に特化
- 🚀
  **インタラクティブモード**: 直感的なインターフェースで更新する依存関係を選択
- 📊 **影響分析**: カタログの変更がどのパッケージに影響するかを理解
- 🔒
  **安全な更新**: ドライランモードとバックアップオプションで安全な依存関係更新
- ⚡ **高パフォーマンス**: 並列 API クエリとインテリジェントキャッシング
- 🛡️ **セキュリティ対応**: 組み込みのセキュリティ脆弱性スキャン
- 🎨
  **美しい UI**: 強化されたプログレスバー、カラーテーマ、インタラクティブプロンプト
- 🌈
  **プログレスバースタイル**: グラデーション、ファンシー、ミニマル、レインボー、ネオン、ブロックスタイルから選択
- 🎭
  **カスタマイズ可能なテーマ**: 複数のカラーテーマ（デフォルト、モダン、ミニマル、ネオン）
- 📈
  **リアルタイムプログレス**: 速度インジケーターと時間推定付きのライブ進行状況追跡
- 🔄 **スマートバージョンチェック**: --version コマンドによる自動更新通知
- 🔐 **プライベートレジストリ対応**: `.npmrc` と `.pnpmrc`
  設定ファイルを自動的に読み取り
- 📦 **マルチレジストリ対応**: 異なるパッケージスコープに異なるレジストリを使用
- 🔧 **設定可能**: 柔軟な設定オプションと更新戦略

**➡️ [すべての機能と詳細を見る](https://pcu-cli.dev/ja)**

## 🚀 クイックスタート

### インストール

```bash
# グローバルインストール（推奨）
npm install -g pnpm-catalog-updates

# または npx を使用
npx pnpm-catalog-updates
```

### 基本的な使用法

```bash
# 新しいPNPMワークスペースとPCU設定を初期化
pcu init

# 既存のワークスペースで更新をチェック
pcu -c

# インタラクティブ更新モード
pcu -i
```

![画像](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

**➡️ [完全なインストールと使用ガイド](https://pcu-cli.dev/ja/quickstart)**

## 📖 ドキュメント

**➡️ [完全なコマンドリファレンス](https://pcu-cli.dev/ja/command-reference)**  
**➡️ [設定ガイド](https://pcu-cli.dev/ja/configuration)**  
**➡️ [例と使用例](https://pcu-cli.dev/ja/examples)**

## 📁 プロジェクト構造

このプロジェクトは、クリーンなアーキテクチャでpnpm
monorepoとして組織されています：

```text
├── apps/
│   └── cli/                    # CLI アプリケーション
└── packages/
    ├── core/                   # コアビジネスロジック
    └── utils/                  # 共有ユーティリティ
```

**➡️ [詳細なアーキテクチャガイド](https://pcu-cli.dev/ja/development)**

## 🧪 開発

### 前提条件

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/houko/pnpm-catalog-updates.git
cd pnpm-catalog-updates

# 依存関係をインストール
pnpm install

# ビルドして実行
pnpm build
pnpm dev --help
```

**➡️ [完全な開発ガイド](https://pcu-cli.dev/ja/development)**

## 📊 設定例

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  typescript: ^5.0.0

catalogs:
  react17:
    react: ^17.0.2
```

```json
// .pcurc.json
{
  "defaults": {
    "target": "latest"
  },
  "packageRules": [
    {
      "patterns": ["react", "react-dom"],
      "target": "minor"
    }
  ]
}
```

**➡️ [設定例とテンプレート](https://pcu-cli.dev/ja/examples)**

## 🤝 貢献

貢献を歓迎します！詳細については、[貢献ガイド](CONTRIBUTING.md)をご覧ください。

**➡️ [開発セットアップとガイドライン](https://pcu-cli.dev/ja/development)**

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細については[LICENSE](LICENSE)ファイルをご覧ください。

## 🙏 謝辞

- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)にインスパイアされました
- pnpmコミュニティへの愛をもって構築
- すべての貢献者とユーザーに感謝

## 📞 サポート

- 📖 [完全なドキュメント](https://pcu-cli.dev/ja)
- 🐛 [課題トラッカー](https://github.com/houko/pnpm-catalog-updates/issues)
- 💬
  [ディスカッション](https://github.com/houko/pnpm-catalog-updates/discussions)

---

pnpmコミュニティのために❤️で作られました
