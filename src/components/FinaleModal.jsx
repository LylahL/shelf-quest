import { useState } from 'react';

const CLASSES = [
  { value: '👑 GAME CHANGERS', valueDesc: 'go after the change that moves the whole system, not just the ticket.', desc: 'took on the item-level work-order refactor at the core of the pipeline.' },
  { value: '📊 DATA FANATICS', valueDesc: 'let the evidence settle it — numbers over opinions.', desc: 'cleared the Datadog dungeon + trued-up phantom inventory.' },
  { value: '⚙️ TEAM OF DOERS', valueDesc: 'get it done, then get it better — action over analysis paralysis.', desc: "survived stow-tool QA bugs and kept shipping. not yet survived Carton Receive's UAT." },
  { value: '🤝 PARTNER OBSESSION', valueDesc: "the partner's problem is our problem — build around what they actually need.", desc: '' },
];

export default function FinaleModal({ onClose }) {
  const [chosen, setChosen] = useState(null);

  return (
    <>
      <span className="x" onClick={onClose}>[X]</span>
      <div className="finale">
        <div className="big">🏆 QUEST COMPLETE</div>
        <div className="quip" style={{ marginBottom: 14 }}>
          choose the Pattern value you "lived" this summer.
        </div>
      </div>
      <div className="classes">
        {CLASSES.map((c) => (
          <div
            key={c.value}
            className="cls"
            style={{ borderColor: chosen === c.value ? 'var(--gold)' : 'var(--line)' }}
            onClick={() => setChosen(c.value)}
          >
            <b>{c.value}</b>
            <br />
            <span style={{ color: 'var(--dim)', fontStyle: 'italic' }}>{c.valueDesc}</span>
            {c.desc && <><br />{c.desc}</>}
          </div>
        ))}
      </div>
      {chosen && (
        <div className="finale" style={{ marginTop: 16 }}>
          <div className="big" style={{ fontSize: 14 }}>CLASS: {chosen}</div>
          <div className="quip">…and that's how I lived it. thank you! 🎤⬇️</div>
        </div>
      )}
    </>
  );
}
