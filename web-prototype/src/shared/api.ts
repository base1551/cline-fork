export type ApiProvider =
  | "anthropic"
  | "openrouter"
  | "bedrock"
  | "vertex"
  | "openai"
  | "ollama"
  | "lmstudio"
  | "gemini"
  | "openai-native";

export interface ModelInfo {
  maxTokens?: number;
  contextWindow?: number;
  supportsImages?: boolean;
  supportsComputerUse?: boolean;
  supportsPromptCache: boolean;
  inputPrice?: number;
  outputPrice?: number;
  cacheWritesPrice?: number;
  cacheReadsPrice?: number;
  description?: string;
}

export interface ApiConfiguration {
  apiProvider?: ApiProvider;
  apiModelId?: string;
  apiKey?: string;
  anthropicBaseUrl?: string;
  openRouterApiKey?: string;
  openRouterModelId?: string;
  openRouterModelInfo?: ModelInfo;
  awsAccessKey?: string;
  awsSecretKey?: string;
  awsSessionToken?: string;
  awsRegion?: string;
  awsUseCrossRegionInference?: boolean;
  vertexProjectId?: string;
  vertexRegion?: string;
  openAiBaseUrl?: string;
  openAiApiKey?: string;
  openAiModelId?: string;
  ollamaModelId?: string;
  ollamaBaseUrl?: string;
  lmStudioModelId?: string;
  lmStudioBaseUrl?: string;
  geminiApiKey?: string;
  openAiNativeApiKey?: string;
  azureApiVersion?: string;
}
