export default function LevelMap({ levels, done, bossUnlocked, onOpen }) {
  function handleClick(e, level, idx, locked) {
    if (locked) {
      e.currentTarget.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0)' },
        ],
        { duration: 200 },
      );
      return;
    }
    onOpen(level, idx);
  }

  return (
    <div className="map">
      {levels.map((level, i) => {
        const locked = level.boss && !bossUnlocked;
        const cls =
          'node' +
          (level.boss ? ' boss' : '') +
          (done.has(level.id) ? ' done' : '') +
          (locked ? ' locked' : '');
        return (
          <div key={level.id} className={cls} onClick={(e) => handleClick(e, level, i, locked)}>
            <span className="lvlno">{level.boss ? 'BOSS' : 'LVL ' + (i + 1)}</span>
            <div className="icon">{level.icon}</div>
            <div className="name">{level.name}</div>
            <div className="tag">{locked ? '🔒 clear all quests' : level.tag}</div>
          </div>
        );
      })}
    </div>
  );
}
