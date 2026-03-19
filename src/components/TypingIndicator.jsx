export default function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start animate-fade-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-acid flex items-center justify-center mt-0.5">
        <span className="font-mono-dm text-[8px] font-medium text-black tracking-wider">CB</span>
      </div>
      <div className="bg-surface border border-border rounded-xl px-4 py-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-acid dot-1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-acid dot-2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-acid dot-3 inline-block" />
        <span className="font-mono-dm text-[11px] text-neutral-600 tracking-wider ml-2">
          Thinking...
        </span>
      </div>
    </div>
  );
}
