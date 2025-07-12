# pnpm-catalog-updates

pnpm ワークスペースカタログ依存関係をチェックおよび更新するための強力な CLI ツール。
[npm-check-updates](https://github.com/raineorshine/npm-check-updates)にインスパイアされました。

[![CI](https://img.shields.io/github/actions/workflow/status/houko/pnpm-catalog-updates/ci.yml?label=CI&logo=github)](https://github.com/houko/pnpm-catalog-updates/actions)
[![npm](https://img.shields.io/npm/v/pnpm-catalog-updates)](https://www.npmjs.com/package/pnpm-catalog-updates)
[![Coverage](https://img.shields.io/coveralls/github/houko/pnpm-catalog-updates/main)](https://coveralls.io/github/houko/pnpm-catalog-updates)

## ✨ 特徴

- 🔍 **スマート検出**: pnpm ワークスペースとカタログ設定を自動的に検出
- 🎯 **カタログ特化**: pnpm カタログ依存関係管理に特化
- 🚀
  **インタラクティブモード**: 直感的なインターフェースで更新する依存関係を選択
- 📊 **影響分析**: カタログの変更がどのパッケージに影響するかを理解
- 🔒
  **安全な更新**: ドライラン モードとバックアップ オプションで安全な依存関係更新
- ⚡ **高パフォーマンス**: 並列 API クエリとインテリジェントキャッシング
- 🛡️ **セキュリティ対応**: 組み込みのセキュリティ脆弱性スキャン
- 🎨
  **美しい UI**: 強化されたプログレスバー、カラーテーマ、インタラクティブプロンプト
- 🎭
  **カスタマイズ可能なテーマ**: 複数のカラーテーマ（デフォルト、モダン、ミニマル、ネオン）
- 📈 **プログレス追跡**: すべての操作のリアルタイム進行状況インジケーター
- 🔧 **設定可能**: 柔軟な設定オプションと更新戦略

## 🚀 クイックスタート

```bash
pcu -c
```

![画像](https://github.com/user-attachments/assets/f05a970e-c58c-44f1-b3f1-351ae30b4a35)

### インストール

```bash
# グローバルインストール
npm install -g pnpm-catalog-updates
# または
npm install -g pcu

# または npx で使用
npx pnpm-catalog-updates
# または
npx pcu

# または短いエイリアスを使用
pcu
```

### 基本的な使い方

```bash
# 更新をクイックチェック
pcu -c

# クイック更新（インタラクティブ）
pcu -i

# クイック更新（ドライラン）
pcu -u -d

# ワークスペース情報を取得
pcu -s
```

### よく使うコマンド

| コマンド | 説明                               | 例                        |
| -------- | ---------------------------------- | ------------------------- |
| `pcu -c` | 更新をチェック                     | `pcu -c --catalog node18` |
| `pcu -i` | 依存関係を更新（インタラクティブ） | `pcu -i -b`               |
| `pcu -a` | 影響を分析                         | `pcu -a default react`    |
| `pcu -s` | ワークスペース情報                 | `pcu -s --validate`       |
| `pcu -h` | ヘルプを表示                       | `pcu -h update`           |

## 📖 完全な使用ガイド

### すべてのコマンドとショートカット

| フルコマンド    | ショートカット | 説明                                 |
| --------------- | -------------- | ------------------------------------ |
| `pcu check`     | `pcu -c`       | 期限切れのカタログ依存関係をチェック |
| `pcu update`    | `pcu -u`       | カタログ依存関係を更新               |
| `pcu analyze`   | `pcu -a`       | 依存関係更新の影響を分析             |
| `pcu workspace` | `pcu -s`       | ワークスペース情報と検証を表示       |
| `pcu help`      | `pcu -h`       | ヘルプ情報を表示                     |

### コマンド

#### `pcu check` / `pcu -c` / `pcu chk`

pnpm ワークスペースカタログで期限切れの依存関係をチェックします。

```bash
pcu check [オプション]
pcu -c [オプション]
pcu chk [オプション]

オプション：
  --catalog <名前>      特定のカタログのみチェック
  -f, --format <タイプ>   出力形式：table、json、yaml、minimal（デフォルト：table）
                        - table：色と詳細情報付きのリッチテーブル形式
                        - minimal：シンプルな npm-check-updates スタイル（パッケージ → バージョン）
                        - json：プログラム使用用の JSON 出力
                        - yaml：設定ファイル用の YAML 出力
  -t, --target <タイプ>   更新対象：latest、greatest、minor、patch、newest（デフォルト：latest）
  --prerelease          プレリリースバージョンを含める
  --include <パターン>   パターンに一致するパッケージを含める
  --exclude <パターン>   パターンに一致するパッケージを除外
  -w, --workspace <パス> ワークスペースディレクトリ（デフォルト：カレントディレクトリ）
  -v, --verbose         詳細情報を表示
```

#### `pcu update` / `pcu -u`

カタログ依存関係を新しいバージョンに更新します。

```bash
pcu update [オプション]
pcu -u [オプション]
pcu u [オプション]

オプション：
  -i, --interactive     更新を選択するインタラクティブモード
  -d, --dry-run         ファイルに書き込まずに変更をプレビュー
  -t, --target <タイプ>   更新対象：latest、greatest、minor、patch、newest（デフォルト：latest）
  --catalog <名前>      特定のカタログのみ更新
  --include <パターン>   パターンに一致するパッケージを含める
  --exclude <パターン>   パターンに一致するパッケージを除外
  --force               リスクがあっても更新を強制
  --prerelease          プレリリースバージョンを含める
  -b, --create-backup   更新前にバックアップファイルを作成
  -f, --format <タイプ>   出力形式：table、json、yaml、minimal（デフォルト：table）
                        - table：色と詳細情報付きのリッチテーブル形式
                        - minimal：シンプルな npm-check-updates スタイル（パッケージ → バージョン）
                        - json：プログラム使用用の JSON 出力
                        - yaml：設定ファイル用の YAML 出力
  -w, --workspace <パス> ワークスペースディレクトリ（デフォルト：カレントディレクトリ）
  -v, --verbose         詳細情報を表示
```

#### `pcu analyze` / `pcu -a`

特定の依存関係を更新する影響を分析します。

```bash
pcu analyze <カタログ> <パッケージ> [バージョン]
pcu -a <カタログ> <パッケージ> [バージョン]
pcu a <カタログ> <パッケージ> [バージョン]

引数：
  カタログ               カタログ名（例：'default'、'react17'）
  パッケージ             パッケージ名（例：'react'、'@types/node'）
  バージョン             新しいバージョン（オプション、デフォルトは最新）

オプション：
  -f, --format <タイプ>   出力形式：table、json、yaml、minimal（デフォルト：table）
  -w, --workspace <パス> ワークスペースディレクトリ（デフォルト：カレントディレクトリ）
  -v, --verbose         詳細情報を表示

例：
  pcu analyze default react
  pcu a default react 18.3.0
  pcu -a react17 @types/react
```

#### `pcu workspace` / `pcu -s`

ワークスペース情報と検証を表示します。

```bash
pcu workspace [オプション]
pcu -s [オプション]
pcu w [オプション]

オプション：
  --validate            ワークスペース設定を検証
  -s, --stats           ワークスペース統計を表示
  -f, --format <タイプ>   出力形式：table、json、yaml、minimal（デフォルト：table）
  -w, --workspace <パス> ワークスペースディレクトリ（デフォルト：カレントディレクトリ）
  -v, --verbose         詳細情報を表示

例：
  pcu workspace           # 基本的なワークスペース情報を表示
  pcu -s --stats         # 詳細な統計を表示
  pcu w --validate       # ワークスペース設定を検証
```

#### `pcu help` / `pcu -h`

ヘルプ情報を表示します。

```bash
pcu help [コマンド]
pcu -h [コマンド]

例：
  pcu help              # 一般的なヘルプを表示
  pcu help update       # update コマンドのヘルプを表示
  pcu -h check          # check コマンドのヘルプを表示
```

### グローバルオプション

これらのオプションはすべてのコマンドで動作します：

```bash
-w, --workspace <パス>   ワークスペースディレクトリパス
-v, --verbose            詳細ロギングを有効にする
--no-color               カラー出力を無効にする
-V, --version            バージョン番号を出力
-h, --help               コマンドのヘルプを表示
```

### 一般的な使用パターン

```bash
# 更新をクイックチェック
pcu -c

# シンプルな出力でチェック（npm-check-updates ライク）
pcu -c --format minimal

# バックアップ付きのインタラクティブ更新
pcu -i -b

# マイナーおよびパッチバージョンのみ更新
pcu -u --target minor

# 特定のカタログをチェック
pcu -c --catalog node18

# 特定のパッケージを除外して更新
pcu -u --exclude "eslint*"

# 詳細出力付きドライラン
pcu -u -d -v

# シンプルな出力形式で更新
pcu -u --format minimal

# 更新前に影響を分析
pcu -a default react
pcu -u --catalog default --include react

# ワークスペース設定を検証
pcu -s --validate
```

### 設定

プロジェクトルートに `.pcurc.json` ファイルを作成します：

```json
{
  "defaults": {
    "target": "latest",
    "timeout": 30000,
    "parallel": 5
  },
  "workspace": {
    "autoDiscover": true,
    "catalogMode": "strict"
  },
  "update": {
    "interactive": true,
    "dryRunFirst": true,
    "skipPrereleases": false
  },
  "output": {
    "format": "table",
    "color": true,
    "verbose": false
  }
}
```

## 📁 プロジェクト構造

このプロジェクトはドメイン駆動設計 (DDD) の原則に従います：

```text
src/
├── cli/                    # CLI インターフェース層
│   ├── commands/           # コマンドハンドラー
│   ├── options/            # オプションパーサー
│   ├── formatters/         # 出力フォーマッター
│   └── validators/         # 入力検証
├── application/            # アプリケーションサービス
│   ├── services/           # アプリケーションサービス
│   ├── handlers/           # コマンドハンドラー
│   └── mappers/            # データマッパー
├── domain/                 # ドメインモデル
│   ├── entities/           # ドメインエンティティ
│   ├── value-objects/      # 値オブジェクト
│   ├── aggregates/         # 集約ルート
│   ├── services/           # ドメインサービス
│   └── repositories/       # リポジトリインターフェース
├── infrastructure/         # インフラストラクチャ層
│   ├── repositories/       # リポジトリ実装
│   ├── external-services/  # 外部サービスクライアント
│   └── file-system/        # ファイルシステム操作
├── adapters/               # アダプター層
│   ├── registry/           # パッケージレジストリアダプター
│   └── package-managers/   # パッケージマネージャーアダプター
└── common/                 # 共通ユーティリティ
    ├── types/              # 型定義
    ├── utils/              # ユーティリティ関数
    ├── config/             # 設定
    └── logger/             # ロギング
```

## 🧪 開発

### 前提条件

- Node.js >= 18.0.0
- pnpm >= 8.15.0

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/houko/pnpm-catalog-updates.git
cd pnpm-catalog-updates

# 依存関係をインストール
pnpm install

# プロジェクトをビルド
pnpm build

# テストを実行
pnpm test

# 開発モードで実行
pnpm dev --help
```

### スクリプト

```bash
# 開発
pnpm dev                    # 開発モードで実行
pnpm build                  # プロジェクトをビルド
pnpm build:watch           # ウォッチモードでビルド

# テスト
pnpm test                   # ユニットテストを実行
pnpm test:watch            # ウォッチモードでテストを実行
pnpm test:coverage         # カバレッジ付きでテストを実行
pnpm test:e2e              # E2E テストを実行

# コード品質
pnpm lint                   # コードをリント
pnpm lint:fix              # リントの問題を修正
pnpm format                 # コードをフォーマット
pnpm typecheck             # 型チェック

# ユーティリティ
pnpm clean                  # ビルド成果物をクリーン
```

### テスト

プロジェクトは包括的なテスト戦略を使用します：

- **ユニットテスト**：個々のコンポーネントを隔離してテスト
- **インテグレーションテスト**：コンポーネント間の相互作用をテスト
- **E2E テスト**：完全な CLI ワークフローをテスト

```bash
# すべてのテストを実行
pnpm test

# カバレッジ付きでテストを実行
pnpm test:coverage

# E2E テストを実行
pnpm test:e2e

# ウォッチモードでテストを実行
pnpm test:watch
```

## 📊 使用例

### 基本的なワークスペース

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  lodash: ^4.17.21
  typescript: ^5.0.0
```

### マルチカタログ設定

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

catalog:
  # デフォルトカタログ
  react: ^18.2.0
  typescript: ^5.0.0

catalogs:
  # レガシーバージョン
  react17:
    react: ^17.0.2
    @types/react: ^17.0.62

  # 最新バージョン
  latest:
    react: ^18.2.0
    typescript: ^5.2.0
```

### package.json での使用

```json
{
  "dependencies": {
    "react": "catalog:",
    "lodash": "catalog:",
    "legacy-lib": "catalog:react17"
  }
}
```

## 🤝 貢献

貢献を歓迎します！詳細については、[貢献ガイド](CONTRIBUTING.md)をご覧ください。

### 開発ワークフロー

1. リポジトリをフォーク
2. 機能ブランチを作成：`git checkout -b feature/amazing-feature`
3. 変更を加える
4. 変更に対するテストを追加
5. すべてのテストが通過することを確認：`pnpm test`
6. コードをリント：`pnpm lint:fix`
7. 変更をコミット：`git commit -m 'feat: add amazing feature'`
8. ブランチにプッシュ：`git push origin feature/amazing-feature`
9. プルリクエストを開く

### コミットメッセージ規約

[Conventional Commits](https://conventionalcommits.org/)を使用します：

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更
- `refactor`: バグを修正せず、機能を追加しないコード変更
- `test`: 不足しているテストの追加または既存テストの修正
- `chore`: ビルドプロセスまたは補助ツールへの変更

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています - 詳細については、[LICENSE](LICENSE)ファイルをご覧ください。

## 🙏 謝辞

- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)にインスパイアされました
- pnpm コミュニティへの愛を込めて構築されました
- すべての貢献者とユーザーの皆様に感謝します

## 📞 サポート

- 📖 [ドキュメント](https://github.com/houko/pnpm-catalog-updates#readme)
- 🐛 [イシュートラッカー](https://github.com/houko/pnpm-catalog-updates/issues)
- 💬
  [ディスカッション](https://github.com/houko/pnpm-catalog-updates/discussions)

---

pnpm コミュニティへの愛を込めて ❤️
