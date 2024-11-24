// LLM設定の管理
let llmConfig = {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-3.5-turbo'
};

// DOM要素の取得
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');
const llmProvider = document.getElementById('llm-provider');
const apiKey = document.getElementById('api-key');
const modelName = document.getElementById('model-name');
const saveSettings = document.getElementById('save-settings');

// LLM設定の保存
saveSettings.addEventListener('click', () => {
    llmConfig = {
        provider: llmProvider.value,
        apiKey: apiKey.value,
        model: modelName.value
    };

    appendMessage('system', 'LLM設定を保存しました');

    localStorage.setItem('llmConfig', JSON.stringify({
        provider: llmConfig.provider,
        model: llmConfig.model
    }));
});

// プロバイダー変更時のモデル選択肢の更新
llmProvider.addEventListener('change', () => {
    const provider = llmProvider.value;
    modelName.innerHTML = '';

    const models = {
        openai: [
            ['gpt-3.5-turbo', 'GPT-3.5 Turbo'],
            ['gpt-4', 'GPT-4']
        ],
        anthropic: [
            ['claude-2', 'Claude 2'],
            ['claude-instant', 'Claude Instant']
        ],
        gemini: [
            ['gemini-pro', 'Gemini Pro']
        ],
        ollama: [
            ['llama2', 'Llama 2'],
            ['mistral', 'Mistral'],
            ['codellama', 'Code Llama']
        ]
    };

    models[provider].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        modelName.appendChild(option);
    });
});

// チャットメッセージ送信処理
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        appendMessage('user', message);

        if (!llmConfig.apiKey) {
            appendMessage('system', 'APIキーが設定されていません。LLM設定を確認してください。');
            return;
        }

        try {
            const response = await callLLMApi(message);
            appendMessage('agent', response);
        } catch (error) {
            appendMessage('system', `エラーが発生しました: ${error.message}`);
        }

        messageInput.value = '';
    }
}

// LLM APIの呼び出し
async function callLLMApi(message) {
    const systemPrompt = 'あなたはGUI操作を支援するAIアシスタントです。ユーザーからの操作指示を理解し、適切な応答を返してください。';

    switch (llmConfig.provider) {
        case 'openai':
            return await callOpenAI(systemPrompt, message);
        case 'anthropic':
            return await callAnthropic(systemPrompt, message);
        case 'gemini':
            return await callGemini(systemPrompt, message);
        case 'ollama':
            return await callOllama(systemPrompt, message);
        default:
            throw new Error('未対応のプロバイダーです');
    }
}

// OpenAI API呼び出し
async function callOpenAI(systemPrompt, message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${llmConfig.apiKey}`
        },
        body: JSON.stringify({
            model: llmConfig.model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            temperature: 0,
            stream: true
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {break;}

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                const data = JSON.parse(line.slice(6));
                const content = data.choices[0]?.delta?.content;
                if (content) {
                    result += content;
                    // 途中経過を表示するために既存のメッセージを更新
                    updateLastAgentMessage(result);
                }
            }
        }
    }

    return result;
}

// Anthropic API呼び出し
async function callAnthropic(systemPrompt, message) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': llmConfig.apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: llmConfig.model,
            system: systemPrompt,
            messages: [{ role: 'user', content: message }],
            stream: true
        })
    });

    if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {break;}

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                const data = JSON.parse(line.slice(6));
                const content = data.delta?.text;
                if (content) {
                    result += content;
                    updateLastAgentMessage(result);
                }
            }
        }
    }

    return result;
}

// Gemini API呼び出し
async function callGemini(systemPrompt, message) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${llmConfig.model}:streamGenerateContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${llmConfig.apiKey}`
        },
        body: JSON.stringify({
            contents: [
                { role: 'user', parts: [{ text: `${systemPrompt}\n\n${message}` }] }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {break;}

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.trim()) {
                const data = JSON.parse(line);
                const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (content) {
                    result += content;
                    updateLastAgentMessage(result);
                }
            }
        }
    }

    return result;
}

// Ollama API呼び出し
async function callOllama(systemPrompt, message) {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: llmConfig.model,
            prompt: `${systemPrompt}\n\n${message}`,
            stream: true
        })
    });

    if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {break;}

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.trim()) {
                const data = JSON.parse(line);
                if (data.response) {
                    result += data.response;
                    updateLastAgentMessage(result);
                }
            }
        }
    }

    return result;
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateLastAgentMessage(content) {
    const lastAgentMessage = chatMessages.querySelector('.message.agent:last-child');
    if (lastAgentMessage) {
        lastAgentMessage.textContent = content;
    } else {
        appendMessage('agent', content);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 保存された設定の読み込み
const savedConfig = localStorage.getItem('llmConfig');
if (savedConfig) {
    const config = JSON.parse(savedConfig);
    llmProvider.value = config.provider;
    modelName.value = config.model;
    llmProvider.dispatchEvent(new Event('change'));
}

// 初期メッセージの表示
appendMessage('system', 'LLM設定を行い、チャットを開始してください。');
