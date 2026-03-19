import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SYSTEM_PROMPT } from './src/systemPrompt.js';

// Manually load .env (lightweight, no extra deps beyond dotenv)
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return res.status(500).json({
      error: 'GROQ_API_KEY not set. Open your .env file and add your key.',
    });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array required.' });
  }

  try {
    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!groqResponse.ok) {
      const errData = await groqResponse.json().catch(() => ({}));
      const msg = errData?.error?.message || `Groq API error ${groqResponse.status}`;
      return res.status(groqResponse.status).json({ error: msg });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[CarBrain] API error:', err.message);
    return res.status(500).json({ error: 'Server error. Check your terminal for details.' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚗 CarBrain API running at http://localhost:${PORT}`);
  console.log(`   Frontend: http://localhost:5173\n`);
});
