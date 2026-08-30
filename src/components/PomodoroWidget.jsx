import React, { useState, useEffect, useRef } from 'react';
import './PomodoroWidget.css';

const MODES = {
  focus: { label: 'جلسة تركيز', duration: 25 * 60, icon: 'fa-solid fa-brain', color: '#F59E0B' },
  shortBreak: { label: 'استراحة قصيرة', duration: 5 * 60, icon: 'fa-solid fa-mug-hot', color: '#10B981' },
  longBreak: { label: 'استراحة طويلة', duration: 15 * 60, icon: 'fa-solid fa-tree', color: '#0EA5E9' },
};

function playTimerChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.log('Audio chime not allowed or supported');
  }
}

export default function PomodoroWidget({ isOpen, onClose }) {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const timerRef = useRef(null);

  const activeConfig = MODES[mode];

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playTimerChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, activeConfig]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
    setIsRunning(false);
  };

  const toggleStartPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(activeConfig.duration);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(activeConfig.duration);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = ((activeConfig.duration - timeLeft) / activeConfig.duration) * 100;

  if (!isOpen) return null;

  return (
    <div className={`pomodoro-floating-widget ${isMinimized ? 'minimized' : ''}`} dir="rtl">
      {/* Minimized Pill Mode */}
      {isMinimized ? (
        <div className="pomo-pill" onClick={() => setIsMinimized(false)}>
          <div className="pomo-pill-icon" style={{ color: activeConfig.color }}>
            <i className={activeConfig.icon}></i>
          </div>
          <span className="pomo-pill-time">{formattedTime}</span>
          <button 
            className="pomo-pill-play"
            onClick={(e) => { e.stopPropagation(); toggleStartPause(); }}
          >
            <i className={isRunning ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>
          </button>
        </div>
      ) : (
        /* Full Widget Card */
        <div className="pomo-card animate-fade-in">
          {/* Header */}
          <div className="pomo-header">
            <div className="pomo-title-group">
              <i className="fa-solid fa-stopwatch pomo-badge-icon" style={{ color: activeConfig.color }}></i>
              <span>مؤقت بومودورو الدراسي</span>
            </div>
            <div className="pomo-header-actions">
              <button 
                className="pomo-action-btn"
                onClick={() => setIsMinimized(true)}
                title="تصغير"
              >
                <i className="fa-solid fa-compress"></i>
              </button>
              <button 
                className="pomo-action-btn"
                onClick={onClose}
                title="إغلاق"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="pomo-modes-bar">
            {Object.keys(MODES).map((key) => {
              const cfg = MODES[key];
              return (
                <button
                  key={key}
                  type="button"
                  className={`pomo-mode-btn ${mode === key ? 'active' : ''}`}
                  style={mode === key ? { borderColor: cfg.color, color: cfg.color } : {}}
                  onClick={() => switchMode(key)}
                >
                  <i className={cfg.icon}></i>
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>

          {/* Timer Display */}
          <div className="pomo-display-box">
            <div className="pomo-time-large">{formattedTime}</div>
            <div className="pomo-progress-track">
              <div 
                className="pomo-progress-bar" 
                style={{ width: `${progressPercent}%`, backgroundColor: activeConfig.color }}
              ></div>
            </div>
            <span className="pomo-status-label">
              {isRunning ? `جاري العمل: ${activeConfig.label}` : 'المؤقت متوقف مؤقتاً'}
            </span>
          </div>

          {/* Controls */}
          <div className="pomo-controls-row">
            <button
              type="button"
              className="pomo-main-btn"
              style={{ backgroundColor: activeConfig.color }}
              onClick={toggleStartPause}
            >
              <i className={isRunning ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>
              <span>{isRunning ? 'إيقاف مؤقت' : 'ابدأ الجلسة'}</span>
            </button>
            <button
              type="button"
              className="pomo-reset-btn"
              onClick={resetTimer}
              title="إعادة تعيين"
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
