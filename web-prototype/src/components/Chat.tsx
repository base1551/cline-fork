import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { ChatProps, Message } from '../types';
import { ApiClient } from '../api/client';

const Chat = ({ config }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !config.apiKey) {return;}

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ApiClient.sendMessage(config, input);

      if (response.error) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'system',
          content: `エラーが発生しました: ${response.error}`
        }]);
        return;
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.data
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: 'エラーが発生しました。'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Paper
            key={message.id}
            sx={{
              p: 2,
              mb: 2,
              maxWidth: '80%',
              ml: message.role === 'user' ? 'auto' : 0,
              backgroundColor: message.role === 'user' ? 'primary.main' :
                             message.role === 'system' ? 'warning.light' : 'grey.100',
              color: message.role === 'user' ? 'white' : 'text.primary'
            }}
          >
            <Typography>{message.content}</Typography>
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="メッセージを入力"
            disabled={isLoading || !config.apiKey}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={isLoading || !config.apiKey}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
