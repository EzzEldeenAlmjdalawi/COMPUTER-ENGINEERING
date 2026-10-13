/* Brief branded welcome screen for first entry in a browser tab or installed PWA. */
(function () {
  'use strict';

  const root = document.documentElement;
  const splash = document.getElementById('ceEntrySplash');
  if (!splash || !root.classList.contains('ce-entry-pending')) {
    splash?.remove();
    return;
  }

  try { sessionStorage.setItem('ce-entry-splash-shown', 'true'); } catch (_) {}
  root.setAttribute('aria-busy', 'true');
  splash.setAttribute('aria-hidden', 'false');

  const progress = splash.querySelector('.ce-entry-progress');
  const fill = splash.querySelector('.ce-entry-progress-fill');
  const percent = splash.querySelector('.ce-entry-percent');
  const status = splash.querySelector('.ce-entry-status');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 1000 : 2500;
  const stages = [
    { at: 0, text: 'تهيئة المنصة الأكاديمية' },
    { at: 27, text: 'ترتيب المساقات والمراجع' },
    { at: 58, text: 'تشغيل الأدوات الأكاديمية' },
    { at: 88, text: 'المنصة الأكاديمية جاهزة' }
  ];
  let stageIndex = -1;
  const start = performance.now();
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    if (fill) fill.style.width = '100%';
    if (percent) percent.textContent = '100%';
    if (progress) progress.setAttribute('aria-valuenow', '100');
    if (status) status.textContent = 'جاهز للبدء';
    window.setTimeout(() => {
      splash.classList.add('is-leaving');
      splash.setAttribute('aria-hidden', 'true');
      root.classList.remove('ce-entry-pending');
      root.removeAttribute('aria-busy');
      window.setTimeout(() => splash.remove(), 500);
    }, reducedMotion ? 100 : 220);
  }

  function tick(now) {
    const ratio = Math.min(1, (now - start) / duration);
    const value = Math.round((1 - Math.pow(1 - ratio, 2)) * 100);
    if (fill) fill.style.width = `${value}%`;
    if (percent) percent.textContent = `${value}%`;
    if (progress) progress.setAttribute('aria-valuenow', String(value));
    const nextStage = stages.reduce((current, item, index) => value >= item.at ? index : current, 0);
    if (nextStage !== stageIndex && status) {
      stageIndex = nextStage;
      status.textContent = stages[stageIndex].text;
    }
    if (ratio >= 1) finish();
    else window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
  window.setTimeout(finish, 6500);
})();
