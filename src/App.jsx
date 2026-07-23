import { useEffect, useRef, useState } from 'react';
import LEVELS from './data/levels';
import TitleScreen from './components/TitleScreen';
import CheeseFountain from './components/CheeseFountain';
import Header from './components/Header';
import CodexSection from './components/CodexSection';
import LevelMap from './components/LevelMap';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import LevelModal from './components/LevelModal';
import FinaleModal from './components/FinaleModal';
import Toast from './components/Toast';

export default function App() {
  const [titleVisible, setTitleVisible] = useState(true);
  const [done, setDone] = useState(() => new Set());
  const [tickets, setTickets] = useState(0);
  const [activeView, setActiveView] = useState(null); // {type:'level', level} | {type:'finale'}
  const [toastMsg, setToastMsg] = useState(null);

  const stepRef = useRef(0);
  const codexRef = useRef(null);
  const statsRef = useRef(null);
  const thanksRef = useRef(null);
  const toastTimerRef = useRef(null);

  const bossUnlocked = LEVELS.filter((l) => !l.boss).every((l) => done.has(l.id));
  const questsCleared = [...done].filter((id) => id !== 'boss').length;
  const lvl = Math.min(questsCleared + 1, 7);
  const xpPercent = (questsCleared / 6) * 100;
  const hint = bossUnlocked ? '▶ BOSS UNLOCKED. finish strong.' : '▶ Clear all 6 quests to unlock the BOSS.';

  function showToast(msg) {
    setToastMsg(msg);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 1800);
  }

  function clearQuest(level) {
    if (done.has(level.id)) {
      setActiveView(null);
      return;
    }
    const next = new Set(done);
    next.add(level.id);
    setDone(next);
    setTickets((t) => t + level.bugs);
    const unlockedNow = LEVELS.filter((l) => !l.boss).every((l) => next.has(l.id));
    if (unlockedNow) showToast('🔓 BOSS UNLOCKED');
    setActiveView(null);
  }

  function claimVictory() {
    setDone((prev) => {
      if (prev.has('boss')) return prev;
      const next = new Set(prev);
      next.add('boss');
      return next;
    });
    setActiveView({ type: 'finale' });
  }

  function openLevel(level, idx) {
    stepRef.current = idx + 1;
    setActiveView({ type: 'level', level });
  }

  function closeModal() {
    setActiveView(null);
  }

  function tourOpen(idx) {
    const level = LEVELS[idx];
    if (!level) return;
    if (!level.boss && !done.has(level.id)) {
      const next = new Set(done);
      next.add(level.id);
      setDone(next);
      setTickets((t) => t + level.bugs);
    }
    setActiveView({ type: 'level', level });
  }

  function go(s) {
    const step = Math.max(0, Math.min(11, s));
    stepRef.current = step;
    if (step === 0) {
      setActiveView(null);
      setTitleVisible(true);
      return;
    }
    setTitleVisible(false);
    if (step >= 1 && step <= 7) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      tourOpen(step - 1);
    } else if (step === 8) {
      claimVictory();
    } else if (step === 9) {
      setActiveView(null);
      codexRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (step === 10) {
      setActiveView(null);
      statsRef.current?.scrollIntoView({ behavior: 'smooth' });
      statsRef.current?.animate();
    } else if (step === 11) {
      setActiveView(null);
      thanksRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    function handleKeydown(e) {
      if (['ArrowRight', 'PageDown'].includes(e.key) || e.key === ' ') {
        e.preventDefault();
        go(stepRef.current + 1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(stepRef.current - 1);
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <>
      <CheeseFountain />
      <TitleScreen visible={titleVisible} onStart={() => go(1)} />
      <div className="wrap">
        <Header lvl={lvl} tickets={tickets} quests={questsCleared} xpPercent={xpPercent} />
        <CodexSection sectionRef={codexRef} />
        <LevelMap levels={LEVELS} done={done} bossUnlocked={bossUnlocked} onOpen={openLevel} />
        <div className="hint">{hint}</div>
        <StatsSection ref={statsRef} thanksRef={thanksRef} />
        <Footer />
      </div>

      {activeView && (
        <div className="scrim open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="card">
            {activeView.type === 'level' && (
              <LevelModal
                level={activeView.level}
                isDone={done.has(activeView.level.id)}
                onClear={clearQuest}
                onClose={closeModal}
                onClaimVictory={claimVictory}
              />
            )}
            {activeView.type === 'finale' && <FinaleModal onClose={closeModal} />}
          </div>
        </div>
      )}

      <Toast message={toastMsg} />
    </>
  );
}
