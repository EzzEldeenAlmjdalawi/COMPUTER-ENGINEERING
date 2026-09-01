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
  function safeGetStorage(key) {
    try {
      if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
    } catch (e) {}
    return null;
  }

  function safeSetStorage(key, val) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (val === null) localStorage.removeItem(key);
        else localStorage.setItem(key, val);
      }
    } catch (e) {}
  }

  function initTheme() {
    const savedMode = safeGetStorage('themeMode');
    if (savedMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (savedMode === 'light') {
      document.body.classList.remove('dark-mode');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    }

    const savedColor = safeGetStorage('ui-theme');
    if (savedColor) {
      document.body.classList.add(savedColor);
    }
  }

  window.toggleDarkMode = function () {
    const isDark = document.body.classList.toggle('dark-mode');
    safeSetStorage('themeMode', isDark ? 'dark' : 'light');
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
    let sidebar = document.getElementById('globalSidebar');
    let backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar) {
      injectGlobalSidebar();
      sidebar = document.getElementById('globalSidebar');
      backdrop = document.getElementById('sidebarBackdrop');
    }
    if (sidebar) sidebar.classList.add('sidebar-open');
    if (backdrop) backdrop.style.display = 'block';
  };

  window.toggleMenu = window.openSidebar;

  window.closeSidebar = function () {
    const sidebar = document.getElementById('globalSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (backdrop) backdrop.style.display = 'none';
  };

  function injectGlobalSidebar() {
    if (document.getElementById('globalSidebar')) return;

    const div = document.createElement('div');
    div.innerHTML = `
      <div id="sidebarBackdrop" class="sidebar-backdrop" style="display:none;" onclick="window.closeSidebar()"></div>
      <aside id="globalSidebar" class="collapsible-sidebar" dir="rtl">
        <div class="sidebar-inner">
          <div class="sidebar-header">
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="#1B2A4A"/>
                <rect x="11" y="11" width="18" height="18" rx="4" fill="#0F172A" stroke="#F59E0B" stroke-width="2"/>
                <circle cx="20" cy="20" r="4" fill="#F59E0B"/>
              </svg>
              <div>
                <span style="font-family:var(--font-mono); font-size:0.95rem; font-weight:900; color:var(--text-main); display:block;">COMPUTER ENG</span>
                <span style="font-size:0.725rem; color:var(--text-subtle);">IUG القائمة الجانبية</span>
              </div>
            </div>
            <button type="button" class="sidebar-close-btn" onclick="window.closeSidebar()" aria-label="إغلاق">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <nav class="sidebar-nav">
            <span class="sidebar-section-label">التنقل الأكاديمي</span>
            <div class="sidebar-links-list">
              <a href="index.html" class="sidebar-nav-item"><i class="fa-solid fa-house"></i> الرئيسية</a>
              <a href="firstYear.html" class="sidebar-nav-item"><i class="fa-solid fa-cubes" style="color:#0EA5E9;"></i> السنة الأولى</a>
              <a href="secndYear.html" class="sidebar-nav-item"><i class="fa-solid fa-microchip" style="color:#10B981;"></i> السنة الثانية</a>
              <a href="thirdYear.html" class="sidebar-nav-item"><i class="fa-solid fa-network-wired" style="color:#8B5CF6;"></i> السنة الثالثة</a>
              <a href="fourthYear.html" class="sidebar-nav-item"><i class="fa-solid fa-laptop-code" style="color:#F59E0B;"></i> السنة الرابعة</a>
              <a href="fifthYear.html" class="sidebar-nav-item"><i class="fa-solid fa-award" style="color:#EC4899;"></i> السنة الخامسة</a>
              <a href="university-requirements.html" class="sidebar-nav-item"><i class="fa-solid fa-graduation-cap" style="color:#06B6D4;"></i> متطلبات الجامعة</a>
              <a href="gpa-calculator.html" class="sidebar-nav-item highlight-item"><i class="fa-solid fa-calculator" style="color:#F59E0B;"></i> حاسبة المعدل</a>
              <a href="study-tools.html" class="sidebar-nav-item"><i class="fa-solid fa-brain" style="color:#10B981;"></i> أدوات الدراسة والسبورة</a>
              <a href="search.html" class="sidebar-nav-item"><i class="fa-solid fa-magnifying-glass"></i> البحث الشامل</a>
            </div>
          </nav>

          <!-- Theme Accent Swatches Section -->
          <div class="sidebar-theme-section">
            <div class="sb-theme-head">
              <span class="sidebar-section-label">تخصيص لون السمة</span>
              <button type="button" class="sb-theme-reset" onclick="window.applyColorTheme('')">الافتراضي</button>
            </div>
            <div class="sb-swatches-grid">
              <button type="button" class="sb-swatch-btn" data-theme="" style="background-color:#1B2A4A; border-color:#F59E0B;" onclick="window.applyColorTheme('')" title="الافتراضي"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-blue" style="background-color:#3b82f6;" onclick="window.applyColorTheme('theme-blue')" title="Blue"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-green" style="background-color:#10b981;" onclick="window.applyColorTheme('theme-green')" title="Green"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-purple" style="background-color:#8b5cf6;" onclick="window.applyColorTheme('theme-purple')" title="Purple"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-orange" style="background-color:#f97316;" onclick="window.applyColorTheme('theme-orange')" title="Orange"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-red" style="background-color:#ef4444;" onclick="window.applyColorTheme('theme-red')" title="Red"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-pink" style="background-color:#ec4899;" onclick="window.applyColorTheme('theme-pink')" title="Pink"></button>
              <button type="button" class="sb-swatch-btn" data-theme="theme-cyan" style="background-color:#06b6d4;" onclick="window.applyColorTheme('theme-cyan')" title="Cyan"></button>
            </div>
          </div>

          <div class="sidebar-footer">
            <span class="sidebar-section-label">قنوات وتطبيقات المنصة</span>
            <div class="sb-contact-quick" style="margin-bottom:0.75rem;">
              <a href="https://t.me/+lUyeZmUh7KpjM2Fi" target="_blank" rel="noopener noreferrer" class="sb-contact-chip" style="background:rgba(14,165,233,0.12); color:var(--accent-teal); border-color:rgba(14,165,233,0.3);">
                <i class="fa-brands fa-telegram"></i> قناة التليجرام الرسمية
              </a>
              <a href="http://t.me/iug_computer_Enfuneering_bot" target="_blank" rel="noopener noreferrer" class="sb-contact-chip" style="background:rgba(245,158,11,0.12); color:var(--accent-amber); border-color:rgba(245,158,11,0.3);">
                <i class="fa-solid fa-robot"></i> بوت الملفات والبرامج
              </a>
              <a href="http://t.me/iug_computer_Enfuneering_bot" target="_blank" rel="noopener noreferrer" class="sb-contact-chip sb-bot-callout" style="background:linear-gradient(135deg, rgba(14,165,233,0.18), rgba(245,158,11,0.18)); border:1.5px solid var(--accent-amber); font-weight:800; color:var(--text-main);">
                <i class="fa-brands fa-telegram" style="color:var(--accent-teal);"></i> <span>استخدم الموقع عبر بوت التليجرام</span>
              </a>
            </div>

            <span class="sidebar-section-label">الدعم والتواصل الفني</span>
            <div class="sb-contact-quick">
              <a href="https://wa.me/972595346617" target="_blank" rel="noopener noreferrer" class="sb-contact-chip" title="تواصل عبر واتساب">
                <i class="fa-brands fa-whatsapp" style="color:#25D366;"></i> <span dir="ltr">+972 59-534-6617</span>
              </a>
              <a href="tel:+972595346617" class="sb-contact-chip" title="اتصال هاتفي">
                <i class="fa-solid fa-phone" style="color:var(--accent-emerald);"></i> <span dir="ltr">0595346617</span>
              </a>
              <a href="mailto:mnmaassddll@gmail.com" class="sb-contact-chip" title="راسلني عبر البريد الإلكتروني">
                <i class="fa-solid fa-paper-plane" style="color:var(--accent-teal);"></i> راسلني عبر الإيميل
              </a>
            </div>
          </div>
        </div>
      </aside>
    `;
    document.body.appendChild(div);
  }

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
  function normalizeSearchQuery(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[\u064B-\u065F]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[\s\-_–—,.:/\\()]+/g, '');
  }

  function initHeaderSearch() {
    const input = document.getElementById('globalSearchInput');
    const dropdown = document.getElementById('headerSearchResults');
    if (!input || !dropdown) return;

    function doSearch() {
      const rawQ = input.value.trim();
      const normQ = normalizeSearchQuery(rawQ);
      const lowerQ = rawQ.toLowerCase();

      if (!rawQ) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      const allSubs = (window.CE_DATA && window.CE_DATA.allSubjects) || (window.allSubjects) || [];
      const linksData = (window.CE_DATA && window.CE_DATA.subjectLinks) || (window.subjectLinks) || {};

      const matches = allSubs.filter((s) => {
        const normName = normalizeSearchQuery(s.name);
        const normCode = normalizeSearchQuery(s.code);
        const normAlt = normalizeSearchQuery(s.altName);
        const normCat = normalizeSearchQuery(s.category);

        return (
          normName.includes(normQ) ||
          normCode.includes(normQ) ||
          normAlt.includes(normQ) ||
          normCat.includes(normQ) ||
          (s.name && s.name.toLowerCase().includes(lowerQ)) ||
          (s.code && s.code.toLowerCase().includes(lowerQ)) ||
          (s.altName && s.altName.toLowerCase().includes(lowerQ))
        );
      }).slice(0, 6);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="search-dropdown-empty">
            <i class="fa-solid fa-magnifying-glass" style="font-size:1.4rem; color:var(--text-subtle); margin-bottom:0.4rem; display:block;"></i>
            <span>لا توجد نتائج مطابقة لـ "<strong>${rawQ}</strong>"</span>
            <a href="search.html?q=${encodeURIComponent(rawQ)}" class="search-dropdown-all-btn" style="margin-top:0.6rem;">
              الانتقال إلى صفحة البحث الشامل <i class="fa-solid fa-arrow-left"></i>
            </a>
          </div>
        `;
      } else {
        const itemsHtml = matches
          .map((s) => {
            const links = linksData[s.name] || {};
            const linkKeys = Object.keys(links).slice(0, 3);
            const isLab = s.isLab || (window.CE_DATA && window.CE_DATA.isLabCourse(s.name));
            const isUnivReq = s.category === 'متطلب جامعة' || (s.category && s.category.includes('جامعة'));
            const targetUrl = isUnivReq ? 'university-requirements.html' : `${s.year}.html#${encodeURIComponent(s.name)}`;
            const subMeta = isUnivReq ? 'متطلب جامعة عام' : `${s.yearTitleAr || ''} • ${s.semesterTitleAr || ''}`;

            return `
              <div class="search-dropdown-item">
                <a href="${targetUrl}" class="search-dropdown-main-link" target="_self">
                  <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.2rem; flex-wrap:wrap;">
                      ${s.code ? `<span class="search-dd-code">${s.code}</span>` : ''}
                      ${s.category ? `<span class="search-dd-cat">${s.category}</span>` : ''}
                      ${isLab ? `<span class="search-dd-lab">مختبر</span>` : ''}
                    </div>
                    <strong class="search-dd-title">${s.name}</strong>
                    <span class="search-dd-meta">${subMeta}</span>
                  </div>
                  <i class="fa-solid fa-chevron-left search-dd-arrow"></i>
                </a>
                ${
                  linkKeys.length > 0
                    ? `
                  <div class="search-dd-quick-links">
                    ${linkKeys
                      .map((k) => {
                        const url = links[k];
                        const isExt = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
                        const targetAttr = isExt ? 'target="_blank" rel="noopener noreferrer"' : 'target="_self"';
                        return `<a href="${url}" ${targetAttr} class="search-dd-pill">${k}</a>`;
                      })
                      .join('')}
                  </div>
                `
                    : ''
                }
              </div>
            `;
          })
          .join('');

        dropdown.innerHTML = `
          <div class="search-dropdown-header">
            <span>النتائج والمقترحات السريعة (${matches.length})</span>
            <span style="font-size:0.75rem; color:var(--text-subtle);">اضغط Enter للبحث الشامل</span>
          </div>
          <div class="search-dropdown-list">${itemsHtml}</div>
          <a href="search.html?q=${encodeURIComponent(rawQ)}" class="search-dropdown-all-btn">
            <span>عرض كافة النتائج في صفحة البحث الشامل 🔍</span>
            <i class="fa-solid fa-arrow-left"></i>
          </a>
        `;
      }

      dropdown.style.display = 'block';
    }

    input.addEventListener('input', doSearch);
    input.addEventListener('focus', doSearch);

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (e && e.target && !input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          window.location.href = `search.html?q=${encodeURIComponent(val)}`;
        }
      } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
      }
    });
  }

  window.initHeaderSearch = initHeaderSearch;

  // ==========================================
  // 7. SEMESTER & SUBJECT ACCORDION TOGGLERS
  // ==========================================
  window.toggleSemesterAccordion = function (semId) {
    const block = document.getElementById(semId);
    if (!block) return;
    block.classList.toggle('is-collapsed');
  };

  window.toggleSubjectAccordion = function (cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.toggle('is-open');
  };

  // ==========================================
  // 8. DOM READY INITIALIZER
  // ==========================================
  function initAllApp() {
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

    // Enforce same-tab navigation for internal links
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('//') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        link.target = '_self';
        link.removeAttribute('rel');
      }
    });

    // Auto-inject sidebar for sub-pages if not present
    if (!document.getElementById('globalSidebar')) {
      injectGlobalSidebar();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllApp);
  } else {
    initAllApp();
  }
})();
