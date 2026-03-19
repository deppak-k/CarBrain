// Lightweight markdown renderer: bold, bullets, line breaks
function renderContent(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    // Bullet list
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      const bullets = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('• '))) {
        bullets.push(
          <li key={i} className="mb-1">{renderInline(lines[i].trim().replace(/^[-•]\s/, ''))}</li>
        );
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-0.5 my-2 text-neutral-300">
          {bullets}
        </ul>
      );
      continue;
    }

    elements.push(
      <p key={i} className="mb-2 last:mb-0 leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-acid font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Message({ role, content, isNew }) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 items-start w-full ${isUser ? 'flex-row-reverse' : ''} ${isNew ? 'animate-fade-up' : ''}`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center mt-0.5
        ${isUser
          ? 'bg-surface-2 border border-border-2'
          : 'bg-acid'
        }
      `}>
        <span className={`font-mono-dm text-[8px] font-medium tracking-wider ${isUser ? 'text-neutral-500' : 'text-black'}`}>
          {isUser ? 'YOU' : 'CB'}
        </span>
      </div>

      {/* Bubble */}
      <div className={`
        max-w-[82%] rounded-xl px-4 py-3 text-[14.5px]
        ${isUser
          ? 'bg-acid-dim border border-acid-dim text-neutral-100'
          : 'bg-surface border border-border text-neutral-200'
        }
      `}>
        {renderContent(content)}
      </div>
    </div>
  );
}
