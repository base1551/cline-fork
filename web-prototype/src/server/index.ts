import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');

const app = express();

// CORSの設定
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const PORT = 3002;

type ModelInfo = {
  maxTokens: number;
  contextWindow: number;
  supportsImages: boolean;
  supportsComputerUse?: boolean;
  supportsPromptCache: boolean;
};

type Models = {
  [key: string]: {
    [key: string]: ModelInfo;
  };
};

// モデル情報（実際のプロジェクトでは本体から取得）
const models: Models = {
  anthropic: {
    'claude-3-5-sonnet-20241022': {
      maxTokens: 8192,
      contextWindow: 200_000,
      supportsImages: true,
      supportsComputerUse: true,
      supportsPromptCache: true,
    },
    'claude-3-opus-20240229': {
      maxTokens: 4096,
      contextWindow: 200_000,
      supportsImages: true,
      supportsPromptCache: true,
    }
  },
  openai: {
    'gpt-3.5-turbo': {
      maxTokens: 4096,
      contextWindow: 128_000,
      supportsImages: true,
      supportsPromptCache: false,
    },
    'gpt-4': {
      maxTokens: 8192,
      contextWindow: 128_000,
      supportsImages: true,
      supportsPromptCache: false,
    }
  },
  gemini: {
    'gemini-pro': {
      maxTokens: 8192,
      contextWindow: 128_000,
      supportsImages: true,
      supportsPromptCache: false,
    }
  }
};

// 利用可能なプロバイダーの一覧を返す
app.get('/api/providers', (_: Request, res: Response) => {
  console.log('GET /api/providers');
  const providers = [
    'anthropic',
    'openai',
    'gemini',
    'ollama',
    'openrouter',
    'bedrock',
    'vertex',
    'lmstudio',
    'openai-native'
  ];
  console.log('Response:', providers);
  res.json(providers);
});

// プロバイダーごとのモデル情報を返す
app.get('/api/models/:provider', (req: Request, res: Response) => {
  console.log('GET /api/models/:provider', req.params);
  const provider = req.params.provider;
  const response = models[provider] || {};
  console.log('Response:', response);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// モジュールとして認識させるための空のexport
export {};
