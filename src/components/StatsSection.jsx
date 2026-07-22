import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const STATS = [
  { to: 72, prefix: '~', label: 'tickets shipped', cls: '' },
  { to: 37, prefix: '', label: 'stow tool tickets', cls: 'b' },
  { to: 11, prefix: '', label: 'carton receive tickets', cls: 'y' },
  { to: 7, prefix: '', label: 'production errors resolved', cls: 'p' },
  { to: 13, prefix: '', label: 'launch support & ops tickets', cls: '' },
  { to: 1, prefix: '', label: 'polymorphic refactor (boss)', cls: 'y' },
];

const StatsSection = forwardRef(function StatsSection({ thanksRef }, ref) {
  const sectionElRef = useRef(null);
  const startedRef = useRef(false);
  const [values, setValues] = useState(() => STATS.map(() => 0));

  function animate() {
    if (startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - t0) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      setValues(STATS.map((s) => Math.floor(s.to * eased)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  useImperativeHandle(ref, () => ({
    scrollIntoView: (opts) => sectionElRef.current?.scrollIntoView(opts),
    animate,
  }));

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !sectionElRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) animate(); }),
      { threshold: 0.3 },
    );
    obs.observe(sectionElRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="codex" ref={sectionElRef}>
      <h2 style={{ color: 'var(--green)' }}>🎮 BY THE NUMBERS</h2>
      <div className="lead">a summer of shipping, in stats.</div>
      <div className="statgrid">
        {STATS.map((s, i) => (
          <div key={s.label} className={`stat ${s.cls}`}>
            <div className="num">{(s.prefix || '') + values[i].toLocaleString()}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="legend" ref={thanksRef} style={{ marginTop: 26, textAlign: 'center', borderColor: 'var(--gold)' }}>
        <h3 style={{ color: 'var(--gold)' }}>🎉 GG — THANK YOU</h3>
        <div className="li">to the Enchantment / Distribute team — Josh, Jonathan, Gavin, Kumari, Jacob, Vasilii & the whole QA crew — for the bugs, the reviews, and a genuinely great summer.</div>
        <div className="li" style={{ color: 'var(--dim)' }}>…questions? 🎤</div>
      </div>
    </section>
  );
});

export default StatsSection;
