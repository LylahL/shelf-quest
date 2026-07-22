import { useState } from 'react';

const CLASSES = [
  { value: 'BE BETTER THAN YESTERDAY', title: '⚙️ The Iterator', desc: 'survived ~20 stow-tool QA bugs and kept shipping. better every sprint.' },
  { value: 'DATA FANATIC', title: '📊 The Investigator', desc: 'cleared the Datadog dungeon + trued-up phantom inventory. evidence-driven.' },
  { value: 'CUSTOMER OBSESSED', title: '🤝 The Outfitter', desc: 'Carton Receive labels, TikTok & FBT launch support. shipped what partners needed.' },
  { value: 'GAME CHANGER', title: '👑 The Architect', desc: 'took on the item-level work-order refactor at the core of the pipeline.' },
];

export default function FinaleModal({ onClose }) {
  const [chosen, setChosen] = useState(null);

  return (
    <>
      <span className="x" onClick={onClose}>[X]</span>
      <div className="finale">
        <div className="big">🏆 QUEST COMPLETE</div>
        <div className="quip" style={{ marginBottom: 14 }}>
          choose the Pattern value you "lived" — your character class.
          <br />
          (swap these for the official four before you present!)
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
            <b>{c.title}</b>
            <br />
            {c.desc}
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
