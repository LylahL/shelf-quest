import { useEffect, useRef, useState } from 'react';

// A small imperative canvas-style widget: cartons are spawned/animated directly
// on the belt DOM node, outside React's render cycle, since React only ever
// renders the two static divert labels inside it.
export default function CasepackRouter() {
  const beltRef = useRef(null);
  const modeRef = useRef('slug');
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const belt = beltRef.current;
    let alive = true;
    const spawnTimer = setInterval(() => {
      if (!alive || !belt) return;
      const c = document.createElement('div');
      c.className = 'carton';
      const lane = modeRef.current === 'slug' ? 0 : Math.floor(Math.random() * 3);
      c.style.top = 18 + lane * 42 + 'px';
      c.style.left = '-24px';
      belt.appendChild(c);
      let x = -24;
      const moveTimer = setInterval(() => {
        x += 6;
        c.style.left = x + 'px';
        if (x > belt.clientWidth - 96) {
          clearInterval(moveTimer);
          if (modeRef.current === 'slug') {
            c.style.left = belt.clientWidth - 96 + 'px';
            setTimeout(() => c.remove(), 700);
          } else {
            c.remove();
          }
        }
      }, 40);
    }, 220);
    return () => {
      alive = false;
      clearInterval(spawnTimer);
    };
  }, []);

  function deployFix() {
    modeRef.current = 'random';
    setFixed(true);
  }

  return (
    <>
      <div id="belt" ref={beltRef}>
        <div className="divert d0">SINGLES</div>
        <div className="divert d1">BUNDLE</div>
        <div className="divert d2">MULTIPACK</div>
      </div>
      <div className="slugwarn">
        {fixed ? (
          <span style={{ color: 'var(--green)' }}>✅ FIXED: singles, bundles &amp; multipacks now route to their own lane.</span>
        ) : (
          '⚠ every scan is landing in the same lane…'
        )}
      </div>
      <button className="btn alt" onClick={deployFix}>🚀 DEPLOY FIX (route by casepack type)</button>
    </>
  );
}
