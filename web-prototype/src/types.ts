import { ApiProvider } from './shared/api';

export interface LLMConfig {
  provider: ApiProvider;
  apiKey: string;
  model: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SettingsProps {
  config: LLMConfig;
  onConfigChange: (config: LLMConfig) => void;
}

export interface ChatProps {
  config: LLMConfig;
}
