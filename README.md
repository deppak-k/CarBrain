# 🚗 CarBrain — AI Car Buying Advisor for Delhi NCR

> Sharp, unbiased car buying advice powered by Groq + LLaMA 3.3 70B. Built for Delhi NCR buyers.

**Live Demo:** [your-app.vercel.app](https://your-app.vercel.app)
**Stack:** React + Vite · Tailwind CSS · Groq API · Express · Vercel Serverless

---

## What I Built

CarBrain is a purpose-built chatbot that gives honest, direct car buying advice — like a knowledgeable friend who knows everything about cars and specifically understands the Delhi NCR market.

The bot knows:
- Delhi NCR on-road prices across all major variants (₹8L–₹30L band)
- All major segments — hatchbacks, sedans, compact SUVs, mid-size SUVs, EVs
- Fuel type decision guide — petrol vs diesel vs CNG vs hybrid vs EV with break-even logic
- Technical concepts explained simply — FWD/AWD/4WD, DCT/CVT/AMT, turbo vs NA, ADAS levels
- Delhi-specific advice — weather conditions, terrain, highway routes, parking, pollution
- Dealer tactics to avoid and best time to buy

---

## Why This Topic

Car buying is one of the most stressful, high-stakes purchases most people make — and most advice online is either too generic or too salesy. There's a clear gap for something that cuts to the chase with real, opinionated recommendations tailored to a specific city and market. Delhi NCR made sense because it has unique conditions — extreme summers, bad monsoon roads, diesel ban rules, heavy traffic — that genuinely affect which car you should buy.

---

## Design Decisions

**Aesthetic:** Industrial dark + acid yellow — inspired by motorsport telemetry dashboards. Deliberately avoids the soft pastel AI chatbot look.

**UX choices:**
- **Empty state → suggested prompts** reduce blank-page friction — users immediately see what kinds of questions work
- **Typing indicator** has a label ("Thinking...") — not just dots
- **Error state** shows the actual error message from the API — actionable, not generic
- **Auto-expanding textarea** caps at 160px — comfortable for longer questions
- **New Chat** button only appears once a conversation starts — clean until needed
- **API key is server-side only** — stored in Vercel environment variables, never exposed to the browser

---

## Architecture
```
Browser (React) → /api/chat (Vercel Serverless / Express locally) → Groq API
```

The Groq API key never touches the browser. The backend validates the request, calls Groq with the system prompt, and returns only the reply text.

- **Local dev:** `server.js` (Express on port 3001) + Vite proxy
- **Production:** `api/chat.js` (Vercel serverless function)
- **Knowledge base:** `src/systemPrompt.js` — single source of truth imported by both

---

## Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key
cp .env.example .env
# Edit .env → paste your key from console.groq.com/keys

# 3. Start both frontend and backend together
npm run dev
```

Open **http://localhost:5173** — both servers start with one command via `concurrently`.

---

## Deploy to Vercel
```bash
# Push to GitHub first
git init
git add .
git commit -m "init carbrain"
git remote add origin https://github.com/YOUR_USERNAME/carbrain.git
git push -u origin main
```

Then in Vercel dashboard:
1. New Project → Import your GitHub repo
2. Settings → Environment Variables → Add: `GROQ_API_KEY = your_key`
3. Deploy

The `.env` file is in `.gitignore` so it never gets committed.

---

## Get a Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free)
3. API Keys → Create Key
4. Add it to `.env` locally or Vercel env vars for production

---

## AI Usage

- The system prompt in `src/systemPrompt.js` was written and refined manually with Delhi-specific knowledge