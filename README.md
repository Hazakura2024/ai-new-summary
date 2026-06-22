# AI News Summary

ネットニュース記事のURLを入力すると、本文を抽出してAI(chatGPT)が自動で3行に要約するWebアプリケーションです。

![動作例](./images/preview.gif)

## 主な機能

- **記事の自動抽出**: URLからニュース記事のタイトルと本文をスクレイピング（Mozilla Readabilityを使用）
- **AI要約**: OpenAI API (gpt-4o-mini) を活用し、重要度順に3行の箇条書きで要約
- **要約の保存・共有**: 生成された要約結果はデータベースに保存され、履歴からの一覧も可能。

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **スタイリング**: Tailwind CSS / shadcn/ui
- **データベース**: Supabase (PostgreSQL)
- **ORM**: Prisma (v7)
- **AI**: OpenAI API
- **状態管理**: Zustand

## ローカル環境の構築

### 1. リポジトリのクローンとパッケージのインストール

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### 2. 環境変数の設定

プロジェクトのルートディレクトリに .env ファイルを作成し、以下の内容を設定してください。

```bash

# Supabase (Transaction connection pooler)

DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-ID]:[PASSWORD]@...:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase (Session connection pooler for Prisma Migrations)

DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-ID]:[PASSWORD]@...:5432/postgres"

# OpenAI API Key

OPENAI_API_KEY="sk-..."

```

### 3. データベースのセットアップ

Prismaを使用してデータベースのテーブルを作成・同期します。

```bash
npx prisma generate
npx prisma db push
```

### 4. 開発サーバーの起動

```Bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスして動作を確認。
