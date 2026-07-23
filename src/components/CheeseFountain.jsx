import { useMemo } from 'react';

const COUNT = 18;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function CheeseFountain() {
  const pieces = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        type: i % 2 === 0 ? 'cheese' : 'apple',
        left: rand(24, 76),
        size: rand(20, 32),
        dx: rand(-70, 70),
        rise: rand(180, 320),
        duration: rand(2.8, 4.6),
        delay: rand(0, 4),
      })),
    [],
  );

  return (
    <div className="cheese-fountain" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`fruit-piece ${p.type}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            '--dx': `${p.dx}px`,
            '--rise': `${p.rise}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
