import Html from './Html';
import CasepackRouter from './CasepackRouter';
import MockLabel from './MockLabel';

export default function LevelModal({ level, isDone, onClear, onClose, onClaimVictory }) {
  return (
    <>
      <span className="x" onClick={onClose}>[X] close</span>
      <h2>{level.title}</h2>
      <div className="quip">{level.quip}</div>
      {level.rows.map(([label, text], i) => (
        <Html key={i} as="div" className="row" html={`<b>${label}:</b> ${text}`} />
      ))}
      {level.mini && <CasepackRouter />}
      {level.label && <MockLabel />}
      <div className="punch" style={{ whiteSpace: 'pre-line' }}>{level.punch}</div>
      {level.win ? (
        <button className="btn" onClick={onClaimVictory}>⚔️ CLAIM VICTORY</button>
      ) : isDone ? (
        <button className="btn ghost" onClick={onClose}>already cleared — back to map</button>
      ) : (
        <button className="btn" onClick={() => onClear(level)}>✓ CLEAR QUEST (+{level.bugs} tickets)</button>
      )}
    </>
  );
}
