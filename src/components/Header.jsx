export default function Header({ lvl, tickets, quests, xpPercent }) {
  return (
    <header>
      <h1>SHELF&nbsp;QUEST</h1>
      <div className="sub">an intern's journey through the amaczar warehouse &nbsp;·&nbsp; press START on any level</div>
      <div className="hud">
        <div className="chip">LVL <b>{lvl}</b></div>
        <div className="chip">TICKETS CLEARED <b>{tickets}</b></div>
        <div className="chip">QUESTS <b>{quests}</b>/6</div>
      </div>
      <div className="bar"><i style={{ width: xpPercent + '%' }} /></div>
    </header>
  );
}
