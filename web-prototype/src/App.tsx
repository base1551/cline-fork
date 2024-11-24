import { useState } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import Settings from './components/Settings';
import Chat from './components/Chat';
import { LLMConfig } from './types';
import { ApiProvider } from './shared/api';

function App() {
  const [llmConfig, setLLMConfig] = useState<LLMConfig>({
    provider: 'anthropic' as ApiProvider, // プロバイダーの型を明示的に指定
    apiKey: '',
    model: ''
  });

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', py: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={4}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Settings
              config={llmConfig}
              onConfigChange={setLLMConfig}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Chat config={llmConfig} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
