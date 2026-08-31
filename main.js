/**
 * COMPUTER ENGINEERING IUG — CORE VANILLA JAVASCRIPT MODULE
 * Handles: Dark Mode, Color Themes, Sidebar Drawer, Live Header Search,
 * Favorites Bookmarking, Study Checklist, and Pomodoro Timer.
 */

(function () {
  'use strict';

  // ==========================================
  // 1. THEME & DARK MODE MANAGER
  // ==========================================
  function initTheme() {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (savedMode === 'light') {
      document.body.classList.remove('dark-mode');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    }

    const savedColor = localStorage.getItem('ui-theme');
    if (savedColor) {
      document.body.classList.add(savedColor);
    }
  }

  window.toggleDarkMode = function () {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
    updateThemeToggleIcons(isDark);
  };

  function updateThemeToggleIcons(isDark) {
    const btns = document.querySelectorAll('.theme-toggle-btn i');
    btns.forEach((icon) => {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  window.applyColorTheme = function (themeId) {
    const classes = document.body.className
      .split(' ')
      .filter((c) => !c.startsWith('theme-'))
      .join(' ');
    
    if (themeId) {
      document.body.className = (classes + ' ' + themeId).trim();
      localStorage.setItem('ui-theme', themeId);
    } else {
      document.body.className = classes.trim();
      localStorage.removeItem('ui-theme');
    }

    // Update active swatch state
    document.querySelectorAll('.sb-swatch-btn').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.theme === (themeId || ''));
    });
  };

  // ==========================================
  // 2. SIDEBAR DRAWER CONTROLLER
  // ==========================================
  window.openSidebar = function () {
    const sidebar = document.getElementById('globalSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('sidebar-open');
    if (backdrop) backdrop.style.display = 'block';
  };

  window.closeSidebar = function () {
    const sidebar = document.getElementById('globalSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (backdrop) backdrop.style.display = 'none';
  };

  // ==========================================
  // 3. FAVORITES / BOOKMARKS SYSTEM
  // ==========================================
  window.getFavorites = function () {
    try {
      const favs = localStorage.getItem('ce_favorites');
      return favs ? JSON.parse(favs) : [];
    } catch (e) {
      return [];
    }
  };

  window.toggleFavorite = function (subjectName) {
    let favs = window.getFavorites();
    const exists = favs.includes(subjectName);
    if (exists) {
      favs = favs.filter((s) => s !== subjectName);
    } else {
      favs.push(subjectName);
    }
    localStorage.setItem('ce_favorites', JSON.stringify(favs));
    updateFavoritesUI();
  };

  function updateFavoritesUI() {
    const favs = window.getFavorites();
    // Update navbar badges
    document.querySelectorAll('.fav-count-badge').forEach((el) => {
      el.textContent = favs.length;
      el.style.display = favs.length > 0 ? 'inline-block' : 'none';
    });

    // Update star icons on cards
    document.querySelectorAll('.subject-tool-btn.star-btn').forEach((btn) => {
      const subject = btn.dataset.subject;
      if (subject) {
        const isFav = favs.includes(subject);
        btn.classList.toggle('is-fav', isFav);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isFav ? 'fa-solid fa-star' : 'fa-regular fa-star';
        }
      }
    });
  }

  window.openFavoritesModal = function () {
    const favs = window.getFavorites();
    const modal = document.getElementById('favoritesModal');
    const listEl = document.getElementById('favoritesModalList');
    if (!modal || !listEl) return;

    if (favs.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem; color: var(--text-muted);">
          <i class="fa-regular fa-star" style="font-size: 2.5rem; color: var(--accent-amber); margin-bottom: 0.75rem;"></i>
          <p style="font-weight: 700;">لا توجد مواد محفوظة في المفضلة بعد.</p>
          <p style="font-size: 0.85rem; color: var(--text-subtle);">اضغط على أيقونة النجمة ⭐ بجانب أي مادة لحفظها والوصول السريع إليها هنا.</p>
        </div>
      `;
    } else {
      const allSubs = (window.CE_DATA && window.CE_DATA.allSubjects) || [];
      const linksData = (window.CE_DATA && window.CE_DATA.subjectLinks) || {};

      listEl.innerHTML = favs
        .map((name) => {
          const subInfo = allSubs.find((s) => s.name === name) || {};
          const links = linksData[name] || {};
          const linkKeys = Object.keys(links);

          return `
            <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 0.75rem;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 0.5rem;">
                <strong style="font-size: 1rem; color: var(--text-main);">${name}</strong>
                <button type="button" onclick="window.toggleFavorite('${name}'); window.openFavoritesModal();" style="background:none; border:none; color:#EF4444; cursor:pointer; font-size:0.8rem; font-weight:700;">
                  <i class="fa-solid fa-trash-can"></i> إزالة
                </button>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap: 0.4rem;">
                ${
                  linkKeys.length > 0
                    ? linkKeys
                        .map(
                          (k) =>
                            `<a href="${links[k]}" target="_blank" rel="noopener noreferrer" style="font-size:0.775rem; font-weight:700; padding: 0.25rem 0.55rem; background:var(--bg-surface); border:1px solid var(--border-default); border-radius:var(--radius-sm); color:var(--text-main); text-decoration:none;">${k}</a>`
                        )
                        .join('')
                    : '<span style="font-size:0.8rem; color:var(--text-subtle);">لا تتوفر روابط مباشرة</span>'
                }
              </div>
            </div>
          `;
        })
        .join('');
    }

    modal.style.display = 'flex';
  };

  window.closeFavoritesModal = function () {
    const modal = document.getElementById('favoritesModal');
    if (modal) modal.style.display = 'none';
  };

  // ==========================================
  // 4. STUDY PROGRESS CHECKLIST SYSTEM
  // ==========================================
  const CHECKLIST_ITEMS = [
    { key: 'book', label: 'الكتاب وحلول الأسئلة' },
    { key: 'lectures', label: 'المحاضرات والشروحات' },
    { key: 'slides', label: 'السلايدات والملخصات' },
    { key: 'problems', label: 'المناقشات وحل التمارين' },
    { key: 'exams', label: 'الكويزات والامتحانات السابقة' },
    { key: 'lab', label: 'المختبر والتجارب العملية' },
  ];

  window.getChecklist = function (subjectName) {
    try {
      const data = localStorage.getItem('ce_study_checklist');
      const all = data ? JSON.parse(data) : {};
      return all[subjectName] || {};
    } catch (e) {
      return {};
    }
  };

  window.toggleChecklistItem = function (subjectName, key) {
    try {
      const data = localStorage.getItem('ce_study_checklist');
      const all = data ? JSON.parse(data) : {};
      const current = all[subjectName] || {};
      current[key] = !current[key];
      all[subjectName] = current;
      localStorage.setItem('ce_study_checklist', JSON.stringify(all));
      window.renderChecklistModalContent(subjectName);
    } catch (e) {}
  };

  window.openChecklistModal = function (subjectName) {
    const modal = document.getElementById('checklistModal');
    if (!modal) return;
    modal.dataset.currentSubject = subjectName;
    window.renderChecklistModalContent(subjectName);
    modal.style.display = 'flex';
  };

  window.renderChecklistModalContent = function (subjectName) {
    const titleEl = document.getElementById('checklistSubjectTitle');
    const bodyEl = document.getElementById('checklistModalBody');
    if (titleEl) titleEl.textContent = subjectName;
    if (!bodyEl) return;

    const checked = window.getChecklist(subjectName);
    const completedCount = CHECKLIST_ITEMS.filter((item) => checked[item.key]).length;
    const percent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

    bodyEl.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:800; margin-bottom:0.4rem;">
          <span>نسبة إنجاز دراسة المساق:</span>
          <span style="color: var(--accent-emerald);">${percent}% (${completedCount}/${CHECKLIST_ITEMS.length})</span>
        </div>
        <div style="width:100%; height:8px; background:var(--bg-surface-subtle); border-radius:var(--radius-full); overflow:hidden;">
          <div style="width:${percent}%; height:100%; background:linear-gradient(90deg, var(--accent-emerald), var(--accent-teal)); border-radius:var(--radius-full); transition:width 0.3s ease;"></div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap: 0.6rem;">
        ${CHECKLIST_ITEMS.map((item) => {
          const isDone = !!checked[item.key];
          return `
            <label style="display:flex; align-items:center; gap:0.75rem; padding: 0.75rem 1rem; background:var(--bg-surface-subtle); border:1px solid var(--border-default); border-radius:var(--radius-md); cursor:pointer; font-weight:700; font-size:0.9rem;">
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.toggleChecklistItem('${subjectName}', '${item.key}')" style="width:18px; height:18px; accent-color:var(--accent-emerald); cursor:pointer;" />
              <span style="${isDone ? 'text-decoration: line-through; color: var(--text-subtle);' : 'color: var(--text-main);'}">${item.label}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  };

  window.closeChecklistModal = function () {
    const modal = document.getElementById('checklistModal');
    if (modal) modal.style.display = 'none';
  };

  // ==========================================
  // 5. POMODORO FOCUS TIMER WIDGET
  // ==========================================
  let pomoTimer = null;
  let pomoTimeLeft = 25 * 60;
  let pomoIsRunning = false;
  let pomoMode = 'focus'; // 'focus' (25m) | 'short' (5m) | 'long' (15m)

  function playSynthChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  }

  function formatPomoTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  window.setPomoMode = function (mode) {
    pomoMode = mode;
    pomoIsRunning = false;
    clearInterval(pomoTimer);
    if (mode === 'focus') pomoTimeLeft = 25 * 60;
    else if (mode === 'short') pomoTimeLeft = 5 * 60;
    else if (mode === 'long') pomoTimeLeft = 15 * 60;
    updatePomoUI();
  };

  window.togglePomoTimer = function () {
    pomoIsRunning = !pomoIsRunning;
    if (pomoIsRunning) {
      pomoTimer = setInterval(() => {
        if (pomoTimeLeft > 0) {
          pomoTimeLeft--;
          updatePomoUI();
        } else {
          clearInterval(pomoTimer);
          pomoIsRunning = false;
          playSynthChime();
          alert(pomoMode === 'focus' ? '🎉 انتهت جلسة التركيز! حان وقت استراحة قصيرة.' : '⏰ انتهت الاستراحة! استعد للعودة للتركيز.');
          updatePomoUI();
        }
      }, 1000);
    } else {
      clearInterval(pomoTimer);
    }
    updatePomoUI();
  };

  window.resetPomoTimer = function () {
    window.setPomoMode(pomoMode);
  };

  function updatePomoUI() {
    const str = formatPomoTime(pomoTimeLeft);
    // Floating Pill
    const pill = document.getElementById('floatingPomoPill');
    const pillTime = document.getElementById('floatingPomoTime');
    if (pillTime) pillTime.textContent = str;

    // Modal
    const modalTime = document.getElementById('pomoModalDisplay');
    const toggleBtn = document.getElementById('pomoToggleBtn');
    if (modalTime) modalTime.textContent = str;
    if (toggleBtn) {
      toggleBtn.innerHTML = pomoIsRunning
        ? '<i class="fa-solid fa-pause"></i> إيقاف مؤقت'
        : '<i class="fa-solid fa-play"></i> بدء المؤقت';
    }

    // Update Mode Buttons in Modal
    document.querySelectorAll('.pomo-mode-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === pomoMode);
    });
  }

  window.openPomodoroModal = function () {
    const modal = document.getElementById('pomodoroModal');
    if (modal) {
      modal.style.display = 'flex';
      updatePomoUI();
    }
  };

  window.closePomodoroModal = function () {
    const modal = document.getElementById('pomodoroModal');
    if (modal) modal.style.display = 'none';
  };

  // ==========================================
  // 6. LIVE HEADER SEARCH
  // ==========================================
  function initHeaderSearch() {
    const input = document.getElementById('globalSearchInput');
    const dropdown = document.getElementById('headerSearchResults');
    if (!input || !dropdown) return;

    input.addEventListener('input', function () {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      const allSubs = (window.CE_DATA && window.CE_DATA.allSubjects) || [];
      const matches = allSubs.filter((s) => {
        return (
          s.name.toLowerCase().includes(q) ||
          (s.altName && s.altName.toLowerCase().includes(q))
        );
      }).slice(0, 7);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div style="padding: 0.75rem; text-align:center; font-size:0.85rem; color:var(--text-muted);">
            لا توجد نتائج مطابقة لـ "${input.value}"
          </div>
        `;
      } else {
        dropdown.innerHTML = matches
          .map((s) => {
            return `
              <a href="${s.year}.html#${s.name}" class="search-item-result">
                <div>
                  <strong style="display:block; font-size:0.9rem;">${s.name}</strong>
                  <span style="font-size:0.75rem; color:var(--text-subtle);">${s.yearTitleAr} • ${s.semesterTitleAr}</span>
                </div>
                <i class="fa-solid fa-chevron-left" style="font-size:0.75rem; color:var(--accent-amber);"></i>
              </a>
            `;
          })
          .join('');
      }

      dropdown.style.display = 'block';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        window.location.href = `search.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    });
  }

  // ==========================================
  // 7. SUBJECT ACCORDION TOGGLER (FOR YEAR PAGES)
  // ==========================================
  window.toggleSubjectAccordion = function (cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.toggle('is-open');
  };

  // ==========================================
  // 8. DOM READY INITIALIZER
  // ==========================================
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initHeaderSearch();
    updateFavoritesUI();
    updatePomoUI();

    // Sticky Navbar Scroll Listener
    window.addEventListener('scroll', function () {
      const nav = document.querySelector('.unified-navbar');
      if (nav) {
        nav.classList.toggle('is-scrolled', window.scrollY > 20);
      }
    });

    // Mobile Hamburger button listener
    const mobileToggle = document.getElementById('mobileMenuToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', window.openSidebar);
    }
  });
})();
