# Cline (旧Claude Dev) – OpenRouterで1位

<p align="center">
  <img src="https://media.githubusercontent.com/media/cline/cline/main/assets/docs/demo.gif" width="100%" />
</p>

<div align="center">
<table>
<tbody>
<td align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev" target="_blank"><strong>VS Marketplaceからダウンロード</strong></a>
</td>
<td align="center">
<a href="https://discord.gg/cline" target="_blank"><strong>Discordに参加</strong></a>
</td>
<td align="center">
<a href="https://github.com/cline/cline/wiki" target="_blank"><strong>ドキュメント</strong></a>
</td>
<td align="center">
<a href="https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop" target="_blank"><strong>機能リクエスト</strong></a>
</td>
</tbody>
</table>
</div>

Clineは、あなたの**CLI**と**エディタ**を使用できるAIアシスタントです。

[Claude 3.5 Sonnetの代理的なコーディング能力](https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf)のおかげで、Clineは複雑なソフトウェア開発タスクを段階的に処理できます。ファイルの作成と編集、大規模プロジェクトの探索、ブラウザの使用、ターミナルコマンドの実行（許可後）を可能にするツールにより、コード補完やテクニカルサポートを超えた支援を提供できます。従来の自律型AIスクリプトはサンドボックス環境で実行されますが、この拡張機能は、すべてのファイル変更とターミナルコマンドを承認するためのヒューマンインザループGUIを提供し、代理型AIの可能性を安全かつアクセスしやすい方法で探求できます。

1. タスクを入力し、モックアップを機能的なアプリに変換したり、スクリーンショットを使用してバグを修正したりするために画像を追加します。
2. Clineは、ファイル構造とソースコードのASTを分析し、正規表現検索を実行し、関連するファイルを読み取ることで、既存のプロジェクトを理解します。コンテキストに追加される情報を慎重に管理することにより、Clineは、コンテキストウィンドウを圧倒することなく、大規模で複雑なプロジェクトでも貴重な支援を提供できます。
3. Clineに必要な情報が揃うと、次のことができます。
    - ファイルの作成と編集、およびその過程でのリンター/コンパイラのエラー（インポートの欠落、構文エラーなど）の監視を行い、問題を事前に修正します。
    - ターミナルでコマンドを直接実行し、作業中の出力を監視することで、たとえば、ファイルを編集した後に発生する開発サーバーの問題に対応できます。
    - Web開発タスクの場合、Clineはヘッドレスブラウザでサイトを起動し、クリック、入力、スクロールを行い、各ステップでスクリーンショットとコンソールログをキャプチャできます。これにより、手動でエラーログをコピー＆ペーストする必要なく、視覚的なバグやランタイムの問題を修正できます。
4. タスクが完了すると、Clineは`open -a "Google Chrome" index.html`のようなターミナルコマンドを提示します。これはボタンをクリックするだけで実行できます。

> [!TIP]
> `CMD/CTRL + Shift + P`ショートカットを使用してコマンドパレットを開き、「Cline: 新しいタブで開く」と入力して、エディターで拡張機能をタブとして開きます。これにより、ファイルエクスプローラーとClineを並べて使用し、ワークスペースがどのように変更されるかをより明確に確認できます。

---

<img align="right" width="340" src="https://github.com/user-attachments/assets/3cf21e04-7ce9-4d22-a7b9-ba2c595e88a4">

### 任意のAPIとモデルを使用

Clineは、OpenRouter、Anthropic、OpenAI、Google Gemini、AWS Bedrock、Azure、GCP VertexなどのAPIプロバイダーをサポートしています。OpenAI互換のAPIを構成したり、LM Studio/Ollamaを使用してローカルモデルを使用することもできます。OpenRouterを使用している場合、拡張機能は最新のモデルリストを取得するため、新しいモデルが利用可能になり次第すぐに使用できます。

この拡張機能は、タスクループ全体と個々のリクエストの合計トークンとAPI使用コストを追跡し、各ステップで費用の情報を提供します。

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/81be79a8-1fdb-4028-9129-5fe055e01e76">

### ターミナルでコマンドを実行

VSCode v1.93の新しい[シェル統合アップデート](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api)のおかげで、Clineはターミナルでコマンドを直接実行し、出力を受信できます。これにより、パッケージのインストール、ビルドスクリプトの実行、アプリケーションのデプロイ、データベースの管理、テストの実行など、幅広いタスクを実行できます。すべて、開発環境とツールチェーンに適応して、作業を正しく完了します。

開発サーバーなどの長時間実行されるプロセスについては、「実行中の続行」ボタンを使用して、コマンドがバックグラウンドで実行されている間もClineがタスクを続行できるようにします。Clineは作業中に新しいターミナル出力について通知されるため、ファイルの編集時に発生する可能性のあるコンパイル時のエラーなど、発生する可能性のある問題に対応できます。

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="400" src="https://github.com/user-attachments/assets/c5977833-d9b8-491e-90f9-05f9cd38c588">

### ファイルの作成と編集

Clineはエディターでファイルを直接作成および編集し、変更の差分ビューを表示します。差分ビューエディターでClineの変更を直接編集または元に戻すか、結果に満足するまでチャットでフィードバックを提供できます。Clineはリンター/コンパイラのエラー（インポートの欠落、構文エラーなど）も監視するため、その過程で発生する問題を独自に修正できます。

すべての変更はファイルのタイムラインに記録されるため、必要に応じて変更を追跡および元に戻すことができます。

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/bc2e85ba-dfeb-4fe6-9942-7cfc4703cbe5">

### ブラウザの使用

Claude 3.5 Sonnetの新しい[コンピューターの使用](https://www.anthropic.com/news/3-5-models-and-computer-use)機能により、Clineはブラウザを起動し、要素をクリックし、テキストを入力し、スクロールし、各ステップでスクリーンショットとコンソールログをキャプチャできます。これにより、インタラクティブなデバッグ、エンドツーエンドテスト、さらには一般的なWeb使用が可能になります。これにより、手動でエラーログをコピー＆ペーストする必要なく、視覚的なバグやランタイムの問題を修正できます。

Clineに「アプリをテストする」ように依頼してみてください。Clineは`npm run dev`のようなコマンドを実行し、ローカルで実行されている開発サーバーをブラウザで起動し、一連のテストを実行してすべてが機能することを確認します。[デモはこちらをご覧ください。](https://x.com/sdrzn/status/1850880547825823989)

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="360" src="https://github.com/user-attachments/assets/7fdf41e6-281a-4b4b-ac19-020b838b6970">

### コンテキストの追加

-   **`@url`:** 拡張機能にURLを貼り付けてmarkdownに変換します。Clineに最新のドキュメントを提供する場合に便利です。
-   **`@problems`:** ワークスペースのエラーと警告（「問題」パネル）を追加して、Clineに修正させます。
-   **`@file`:** ファイルの内容を追加するため、APIリクエストを無駄にファイルの読み込みを承認する必要がありません（+ ファイルを検索するためのタイプ）。
-   **`@folder`:** フォルダーのファイルを一度に追加して、ワークフローをさらに高速化します。

## コントリビューション

プロジェクトに貢献するには、まず[未解決の問題](https://github.com/cline/cline/issues)を調べるか、[機能リクエストボード](https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop)を確認してください。また、[Discord](https://discord.gg/cline)に参加して、アイデアを共有したり、他の貢献者と交流したりすることも歓迎します。

<details>
<summary>ローカル開発手順</summary>

1. リポジトリをクローンします（[git-lfs](https://git-lfs.com/)が必要です）：
    ```bash
    git clone https://github.com/cline/cline.git
    ```
2. VSCodeでプロジェクトを開きます：
    ```bash
    code cline
    ```
3. 拡張機能とwebview-guiに必要な依存関係をインストールします：
    ```bash
    npm run install:all
    ```
4. `F5`キー（または「実行」->「デバッグの開始」）を押して、拡張機能がロードされた新しいVSCodeウィンドウを開きます。（プロジェクトのビルドで問題が発生した場合は、[esbuild problem matchers拡張機能](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers)をインストールする必要がある場合があります。）

</details>

## ライセンス

[Apache 2.0 © 2024 Cline Bot Inc.](./LICENSE)

## プロジェクト構成

このプロジェクトはVS Code拡張機能で、大きく分けて以下の2つの主要な部分から構成されています。

**1. バックエンド (TypeScript): `src` ディレクトリ**

*   **コアロジック**:  拡張機能の中核となる機能。AIモデルとの連携、VS Code APIとの統合、内部データ処理などを含みます。
    *   `api`: さまざまなAIモデルプロバイダーとのインターフェース。
    *   `core`:  主要なロジックとデータ構造。
    *   `exports`:  公開API。
    *   `integrations`:  VS Codeエディタ、ターミナル、ワークスペースとの統合。
    *   `services`:  補助的なサービス（ファイルシステム操作など）。
    *   `shared`:  共有ユーティリティ関数。
    *   `test`:  テストコード。
    *   `utils`:  ユーティリティ関数。

*   **図解:**

```
src/
├── api/
├── core/
├── exports/
├── integrations/
│   ├── diagnostics/
│   ├── editor/
│   ├── misc/
│   ├── terminal/
│   ├── theme/
│   └── workspace/
├── services/
│   ├── browser/
│   ├── glob/
│   ├── ripgrep/
│   └── tree-sitter/
├── shared/
├── test/
└── utils/
```


**2. フロントエンド (React): `webview-ui` ディレクトリ**

*   ユーザーインターフェース:  ユーザーが対話する部分。チャット画面、設定画面など。
    *   `public`: 静的ファイル。
    *   `src`: Reactコンポーネント。

*   **図解:**

```
webview-ui/
├── public/
└── src/
    ├── App.tsx
    ├── components/
    │   ├── chat/
    │   ├── common/
    │   ├── history/
    │   └── settings/
    ├── context/
    └── utils/
```

**その他:**

*   `assets`:  アイコンなどのアセットファイル。
*   `package.json`:  プロジェクトの依存関係。
*   `tsconfig.json`:  TypeScriptコンパイラの設定。


この階層構造により、コードの保守性と拡張性が向上しています。
