export default function TitleScreen({ visible, onStart }) {
  return (
    <div className={`title${visible ? '' : ' gone'}`}>
      <div>
        <div className="tsmall">★ INTERN EDITION ★</div>
        <h1 className="tbig">SHELF&nbsp;QUEST</h1>
        <div className="tname">Lylah Liu · Summer 2026 Intern</div>
        <div className="tsub">a journey through the amaczar warehouse</div>
        <button className="btn" onClick={onStart}>▶ PRESS START</button>
        <div className="tnote">tip: use your clicker / arrow keys&nbsp;→&nbsp;to advance</div>
      </div>
    </div>
  );
}
