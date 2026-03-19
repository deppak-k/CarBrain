const PROMPTS = [
  { icon: '💰', label: 'Best for ₹15L', text: "I have a budget of ₹15 lakhs on-road in Delhi. What's the best car I can buy right now?" },
  { icon: '🔋', label: 'Go electric?', text: "Should I buy an EV in Delhi? Is the charging infrastructure actually ready?" },
  { icon: '🔄', label: 'New vs used', text: "Is it smarter to buy a new entry-level car or a 2-year-old mid-range one in Delhi?" },
  { icon: '👨‍👩‍👧', label: 'Family SUV', text: "I need a safe family SUV for 4 people, lots of Delhi-Jaipur highway driving, under ₹22 lakhs on-road." },
  { icon: '⛽', label: 'Petrol or diesel?', text: "I drive around 18,000 km a year in Delhi NCR. Should I go petrol or diesel?" },
{ icon: '🔧', label: 'Low maintenance', text: "Which cars between ₹10–20 lakhs have the lowest maintenance costs in Delhi long-term?" },
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <p className="font-mono-dm text-[10px] tracking-[0.18em] text-neutral-600 text-center mb-4 uppercase">
        Quick questions to start
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => onSelect(p.text)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-[13px]
              bg-surface border border-border-2 text-neutral-400
              hover:border-acid hover:text-acid hover:bg-acid-dim
              transition-all duration-200 hover:-translate-y-0.5
              animate-fade-up-delay-${Math.min(i + 1, 5)}
            `}
          >
            <span className="text-sm leading-none">{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
