import { ApiProvider, ModelInfo } from '../shared/api';

const API_BASE_URL = 'http://localhost:3002';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export class ApiClient {
  static async getProviders(): Promise<ApiResponse<ApiProvider[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/providers`);
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : '不明なエラーが発生しました'
      };
    }
  }

  static async getModels(provider: ApiProvider): Promise<ApiResponse<Record<string, ModelInfo>>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/models/${provider}`);
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        data: {},
        error: error instanceof Error ? error.message : '不明なエラーが発生しました'
      };
    }
  }

  static async sendMessage(config: any, message: string): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config,
          message,
        }),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        data: '',
        error: error instanceof Error ? error.message : '不明なエラーが発生しました'
      };
    }
  }
}
