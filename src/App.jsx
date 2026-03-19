import { useRef, useEffect } from 'react';
import { useChat } from './hooks/useChat';
import Message from './components/Message';
import TypingIndicator from './components/TypingIndicator';
import SuggestedPrompts from './components/SuggestedPrompts';
import ChatInput from './components/ChatInput';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const bottomRef = useRef(null);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (messages.length !== prevCountRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevCountRef.current = messages.length;
    }
  }, [messages]);

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">

      {/* Background grid */}
      <div className="fixed inset-0 bg-grid opacity-100 pointer-events-none z-0
        [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_100%)]" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-[rgba(10,10,10,0.88)] backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">🚗</span>
            <div>
              <span className="font-display text-[22px] tracking-wider text-white leading-none block">
                CarBrain
              </span>
              <span className="font-mono-dm text-[8px] tracking-[0.2em] text-acid leading-none block mt-0.5">
                AI ADVISOR
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-blink" />
              <span className="font-mono-dm text-[10px] tracking-[0.15em] text-neutral-600">LIVE</span>
            </div>

            {/* Clear chat */}
            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md
                  border border-border-2 text-neutral-500 font-mono-dm text-[11px] tracking-wide
                  hover:border-acid hover:text-acid transition-all duration-200"
              >
                <RotateCcw size={11} />
                New Chat
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        {isEmpty ? (
          /* Empty / Hero state */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px-160px)] px-6 py-12 gap-12">

            {/* Hero text */}
            <div className="text-center animate-fade-up">
              <div className="inline-block font-mono-dm text-[10px] tracking-[0.22em] text-acid
                bg-acid-dim border border-acid-dim rounded-full px-4 py-1.5 mb-7">
                POWERED BY GROQ + LLAMA 3.3 70B
              </div>

              <h1 className="font-display leading-[0.92] tracking-wide text-white mb-5"
                style={{ fontSize: 'clamp(52px, 10vw, 92px)' }}>
                Your unfair<br />
                <span className="text-acid">car buying</span><br />
                advantage.
              </h1>

              <p className="text-[15px] text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Straight answers on budget picks, new vs used, EVs, hidden costs, and dealer tactics.
                No fluff.
              </p>
            </div>

            {/* Suggested prompts */}
            <SuggestedPrompts onSelect={sendMessage} />
          </div>
        ) : (
          /* Conversation */
          <div className="max-w-4xl mx-auto px-5 py-8 flex flex-col gap-5">
            {messages.map((msg, i) => (
              <Message
                key={i}
                role={msg.role}
                content={msg.content}
                isNew={i === messages.length - 1}
              />
            ))}

            {isLoading && <TypingIndicator />}

            {/* Error state */}
            {error && (
              <div className="flex items-start gap-3 bg-red-950/30 border border-red-800/40
                rounded-xl px-4 py-3 animate-fade-up">
                <span className="text-danger text-lg leading-none mt-0.5">⚠</span>
                <div>
                  <p className="font-mono-dm text-[11px] tracking-wider text-danger mb-1">ERROR</p>
                  <p className="text-[13px] text-red-300">{error}</p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* ── Footer / Input ── */}
      <footer className="sticky bottom-0 z-50
        bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent
        px-5 pt-4 pb-5">
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
        <p className="text-center font-mono-dm text-[10px] text-neutral-700 mt-3 tracking-wide">
          CarBrain gives general guidance · always verify before you buy
        </p>
      </footer>
    </div>
  );
}
