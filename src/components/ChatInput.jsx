import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`
        flex gap-3 items-end
        bg-surface border rounded-xl px-4 py-3
        transition-all duration-200
        ${value ? 'border-acid shadow-[0_0_0_1px_rgba(232,255,0,0.15)]' : 'border-border-2'}
      `}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about buying a car..."
          rows={1}
          disabled={isLoading}
          className="
            flex-1 bg-transparent border-none outline-none resize-none
            text-[14.5px] text-neutral-100 placeholder-neutral-600
            min-h-6 max-h-40 leading-relaxed
            disabled:opacity-50
          "
        />
        <button
          onClick={submit}
          disabled={!canSend}
          className="
            flex-shrink-0 w-9 h-9 rounded-lg
            bg-acid flex items-center justify-center
            transition-all duration-200
            hover:scale-105 hover:brightness-110
            disabled:opacity-25 disabled:cursor-not-allowed disabled:scale-100
          "
        >
          <Send size={15} className="text-black" />
        </button>
      </div>
      <p className="text-center font-mono-dm text-[10px] text-neutral-700 mt-2 tracking-wider">
        ENTER TO SEND · SHIFT+ENTER FOR NEW LINE
      </p>
    </div>
  );
}
