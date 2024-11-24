import { useEffect, useState } from 'react';
import { FormControl, FormLabel, Select, MenuItem, TextField, Box, Typography } from '@mui/material';
import { SettingsProps } from '../types';
import { ApiClient } from '../api/client';
import { ApiProvider } from '../shared/api';

const Settings = ({ config, onConfigChange }: SettingsProps) => {
  const [providers, setProviders] = useState<ApiProvider[]>([]);
  const [models, setModels] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  // プロバイダー一覧の取得
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await ApiClient.getProviders();
        if (response.error) {
          setError(response.error);
        } else {
          setProviders(response.data);
        }
      } catch (error) {
        setError('プロバイダーの取得に失敗しました');
      }
    };
    fetchProviders();
  }, []);

  // プロバイダーに応じたモデル一覧の取得
  useEffect(() => {
    const fetchModels = async () => {
      if (!config.provider) {return;}
      try {
        const response = await ApiClient.getModels(config.provider);
        if (response.error) {
          setError(response.error);
        } else {
          setModels(response.data);
        }
      } catch (error) {
        setError('モデル情報の取得に失敗しました');
      }
    };
    fetchModels();
  }, [config.provider]);

  const handleProviderChange = async (provider: ApiProvider) => {
    // モデルをクリアしてからプロバイダーを変更
    await onConfigChange({ ...config, provider, model: '', apiKey: '' });
    // プロバイダーが設定されている場合のみモデル一覧を取得
    if (provider) {
      const response = await ApiClient.getModels(provider);
      if (response.error) {
        setError(response.error);
      } else {
        setModels(response.data);
        const modelIds = Object.keys(response.data);
        if (modelIds.length > 0) {
          onConfigChange({ ...config, model: modelIds[0] });
        }
      }
    }
  };

  if (error) {
    return (
      <Typography color="error">
        エラーが発生しました: {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        LLM設定
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <FormLabel>LLMプロバイダー</FormLabel>
          <Select
            value={config.provider || ''}
            onChange={(e) => handleProviderChange(e.target.value as ApiProvider)}
          >
            {providers.map((provider) => (
              <MenuItem key={provider} value={provider}>{provider}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>APIキー</FormLabel>
          <TextField
            type="password"
            value={config.apiKey}
            onChange={(e) => onConfigChange({ ...config, apiKey: e.target.value })}
            placeholder="APIキーを入力"
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>モデル</FormLabel>
          <Select
            value={config.model || ''}
            onChange={(e) => onConfigChange({ ...config, model: e.target.value })}
          >
            {Object.keys(models).map((modelId) => (
              <MenuItem key={modelId} value={modelId}>
                {modelId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Settings;
