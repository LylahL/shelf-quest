import { useEffect, useRef, useState } from 'react';

// Visualizes the actual "stow from any container" fix: every container type
// used to hit /scan_source_container, but only PCL made it through — pallets,
// totes, and problem-solve carts got bounced. After the fix, the same gate
// accepts all of them.
const TYPES = ['PCL', 'PLT', 'TOTE', 'CART'];
const LANES = [18, 50, 92];

export default function AnyContainerGate() {
  const laneRef = useRef(null);
  const openRef = useRef(false);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const lane = laneRef.current;
    let alive = true;
    const spawnTimer = setInterval(() => {
      if (!alive || !lane) return;
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      const top = LANES[Math.floor(Math.random() * LANES.length)];
      const token = document.createElement('div');
      token.className = `ctoken ctoken-${type.toLowerCase()}`;
      token.textContent = type;
      token.style.top = top + 'px';
      token.style.left = '-56px';
      lane.appendChild(token);

      const gateX = lane.clientWidth / 2 - 26;
      let x = -56;
      let bounced = false;
      const moveTimer = setInterval(() => {
        if (!alive || !lane.isConnected) {
          clearInterval(moveTimer);
          return;
        }
        if (!bounced) {
          x += 4;
          token.style.left = x + 'px';
          if (x >= gateX && !token.dataset.checked) {
            token.dataset.checked = '1';
            const accepted = openRef.current || type === 'PCL';
            token.classList.add(accepted ? 'ctoken-pass' : 'ctoken-reject');
            if (!accepted) bounced = true;
          }
          if (x > lane.clientWidth + 10) {
            clearInterval(moveTimer);
            token.remove();
          }
        } else {
          x -= 6;
          token.style.left = x + 'px';
          if (x < -56) {
            clearInterval(moveTimer);
            token.remove();
          }
        }
      }, 30);
    }, 480);
    return () => {
      alive = false;
      clearInterval(spawnTimer);
    };
  }, []);

  function deployFix() {
    openRef.current = true;
    setFixed(true);
  }

  return (
    <>
      <div className="gatelane" ref={laneRef}>
        <div className="gatepost">
          <span>/scan_source_container</span>
        </div>
      </div>
      <div className="slugwarn">
        {fixed ? (
          <span style={{ color: 'var(--green)' }}>✅ FIXED: PCL, pallets, totes &amp; PS carts all pass the same gate.</span>
        ) : (
          '⚠ only PCL passes — everything else gets bounced'
        )}
      </div>
      <button className="btn alt" onClick={deployFix}>🚀 DEPLOY FIX (accept any source container)</button>
    </>
  );
}
