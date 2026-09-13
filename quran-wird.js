/**
 * COMPUTER ENGINEERING IUG — QURAN WIRD CONTROLLER
 * إدارة تصفح القرآن، تسجيل الورد اليومي، فلترة الصفحات حسب السورة، وتكبير الخط
 */

(function () {
  'use strict';

  let selectedSurahFilter = 'all'; // 'all' or specific surahId e.g. 'fatiha', 'baqarah'
  let currentSurahId = 'fatiha';
  let currentPageNumber = 1;
  let currentFontSize = 1.75; // rem

  function initQuranApp() {
    loadSavedProgress();
    populateSurahSelect();
    populatePageSelect();
    renderCurrentPage();
    updateStreakDisplay();
    setupEventListeners();
  }

  function getFilteredPages() {
    if (selectedSurahFilter === 'all') {
      const all = [];
      quranWirdData.surahs.forEach(s => {
        s.pages.forEach(p => all.push(p));
      });
      return all;
    }
    const surah = quranWirdData.surahs.find(s => s.id === selectedSurahFilter);
    return surah ? surah.pages : [];
  }

  function loadSavedProgress() {
    try {
      const savedFilter = localStorage.getItem('quran_surah_filter');
      if (savedFilter && (savedFilter === 'all' || quranWirdData.surahs.some(s => s.id === savedFilter))) {
        selectedSurahFilter = savedFilter;
      }

      const savedPage = localStorage.getItem('quran_last_page');
      if (savedPage) {
        const pNum = parseInt(savedPage, 10);
        if (!isNaN(pNum)) {
          // Check if page exists
          let pageFound = false;
          quranWirdData.surahs.forEach(s => {
            if (s.pages.some(p => p.pageNumber === pNum)) {
              currentSurahId = s.id;
              currentPageNumber = pNum;
              pageFound = true;
            }
          });

          // If filter is active and page doesn't belong to filter, adjust
          if (pageFound && selectedSurahFilter !== 'all' && selectedSurahFilter !== currentSurahId) {
            selectedSurahFilter = currentSurahId;
          }
        }
      }
    } catch (e) {}
  }

  function saveProgress(pageNum) {
    try {
      localStorage.setItem('quran_last_page', pageNum.toString());
      localStorage.setItem('quran_surah_filter', selectedSurahFilter);
    } catch (e) {}
  }

  function populateSurahSelect() {
    const surahSelect = document.getElementById('surahSelect');
    if (!surahSelect) return;

    let html = `<option value="all" ${selectedSurahFilter === 'all' ? 'selected' : ''}>📖 جميع السور (عرض كل الصفحات)</option>`;
    html += quranWirdData.surahs.map(s => {
      return `<option value="${s.id}" ${s.id === selectedSurahFilter ? 'selected' : ''}>${s.fullName} (${s.type} - ${toArabicNumerals(s.ayahCount)} آية)</option>`;
    }).join('');

    surahSelect.innerHTML = html;
    surahSelect.value = selectedSurahFilter;
  }

  function populatePageSelect() {
    const pageSelect = document.getElementById('pageSelect');
    if (!pageSelect) return;

    const pages = getFilteredPages();

    pageSelect.innerHTML = pages.map(p => {
      return `<option value="${p.pageNumber}" ${p.pageNumber === currentPageNumber ? 'selected' : ''}>صفحة ${toArabicNumerals(p.pageNumber)} — ${p.surahName} (آيات ${p.ayahRange})</option>`;
    }).join('');

    if (pageSelect.querySelector(`option[value="${currentPageNumber}"]`)) {
      pageSelect.value = currentPageNumber;
    }
  }

  function renderCurrentPage() {
    const surah = quranWirdData.surahs.find(s => s.id === currentSurahId) || quranWirdData.surahs[0];
    const page = surah.pages.find(p => p.pageNumber === currentPageNumber) || surah.pages[0];

    saveProgress(page.pageNumber);

    // Sync dropdowns
    const surahSelect = document.getElementById('surahSelect');
    if (surahSelect && surahSelect.value !== selectedSurahFilter) {
      surahSelect.value = selectedSurahFilter;
    }

    populatePageSelect();

    const pageSelect = document.getElementById('pageSelect');
    if (pageSelect) {
      pageSelect.value = page.pageNumber;
    }

    // 1. Update Mushaf Section
    document.getElementById('mushafSurahHeader').textContent = page.mushafHeader;
    document.getElementById('mushafSurahMeta').textContent = `الجزء ${toArabicNumerals(page.juzNumber)} • ${page.surahType} • الآيات (${page.ayahRange})`;

    // Render Verses
    const versesContainer = document.getElementById('mushafVersesContainer');
    if (versesContainer) {
      versesContainer.style.fontSize = currentFontSize + 'rem';
      
      let html = '';
      if (page.mushafVerses && page.mushafVerses.length > 0) {
        page.mushafVerses.forEach((v) => {
          if (v.isBasmalah) {
            html += `<div class="basmalah-container"><div class="basmalah-text">${v.text}</div></div>`;
          } else {
            html += `<span class="ayah-item" data-ayah="${v.num}" onclick="window.scrollToTafseerAyah(${v.num})">${v.text} <span class="ayah-symbol">﴿${toArabicNumerals(v.num)}﴾</span> </span>`;
          }
        });
      }
      versesContainer.innerHTML = html;
    }

    // Page footer info
    document.getElementById('pageNumberDisplay').textContent = `صفحة ${toArabicNumerals(page.pageNumber)}`;
    document.getElementById('juzDisplay').textContent = `الجزء ${toArabicNumerals(page.juzNumber)}`;
    document.getElementById('hizbDisplay').textContent = `الحزب ${toArabicNumerals(page.hizbNumber)}`;

    // 2. Update Tadabbur Section
    const introCard = document.getElementById('tadabburIntroCard');
    const introText = document.getElementById('tadabburIntroText');
    if (page.introTadabbur) {
      introCard.style.display = 'block';
      introText.textContent = page.introTadabbur;
    } else {
      introCard.style.display = 'none';
    }

    // Purpose & General Tafseer
    const purposeBox = document.getElementById('purposeBox');
    if (page.purposes && page.purposes.length > 0) {
      purposeBox.style.display = 'block';
      document.getElementById('purposeText').textContent = page.purposes.join(' • ');
      document.getElementById('generalTafseerText').textContent = page.generalTafseer || '';
    } else {
      purposeBox.style.display = 'none';
    }

    // Verses Tafseer
    const tafseerList = document.getElementById('tafseerVersesList');
    if (page.versesTafseer && page.versesTafseer.length > 0) {
      tafseerList.innerHTML = page.versesTafseer.map(vt => {
        let pointsHtml = '';
        if (vt.points && vt.points.length > 0) {
          pointsHtml = `<div class="tafseer-points-list">${vt.points.map(pt => `<div>${pt}</div>`).join('')}</div>`;
        }
        return `
          <div class="tafseer-verse-item" id="tafseer-ayah-${vt.ayahNumber}">
            <div class="tafseer-verse-header">${vt.ayahText}</div>
            <div class="tafseer-verse-body">
              ${vt.tafseer}
              ${pointsHtml}
            </div>
          </div>
        `;
      }).join('');
    } else {
      if (page.isPendingNext) {
        tafseerList.innerHTML = `
          <div class="next-page-card">
            <i class="fa-solid fa-hourglass-half" style="font-size:2rem; color:var(--accent-amber);"></i>
            <h3 style="margin:0; font-weight:800;">${page.surahName} (صفحة ${toArabicNumerals(page.pageNumber)}) — الورد القادم</h3>
            <p style="color:var(--text-subtle); margin:0; font-size:0.9rem;">الآيات جاهزة، وبمجرد إرسال التفسير سيتم إضافته وتنسيقه فوراً بإذن الله 🤍</p>
          </div>
        `;
      } else {
        tafseerList.innerHTML = '';
      }
    }

    // Benefits
    const benefitsBox = document.getElementById('benefitsBox');
    if (page.benefits && page.benefits.length > 0) {
      benefitsBox.style.display = 'block';
      document.getElementById('benefitsList').innerHTML = page.benefits.map(b => `<li>${b}</li>`).join('');
    } else {
      benefitsBox.style.display = 'none';
    }

    // Navigation buttons state
    updateNavButtons(page.pageNumber);
  }

  function updateNavButtons(pageNum) {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pages = getFilteredPages();
    const currentIndex = pages.findIndex(p => p.pageNumber === pageNum);

    const prevBtnBottom = document.getElementById('prevPageBtnBottom');
    const nextBtnBottom = document.getElementById('nextPageBtnBottom');
    const bottomText = document.getElementById('bottomPageText');

    if (prevBtn) {
      prevBtn.disabled = currentIndex <= 0;
    }
    if (prevBtnBottom) {
      prevBtnBottom.disabled = currentIndex <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === -1 || currentIndex >= pages.length - 1;
    }
    if (nextBtnBottom) {
      nextBtnBottom.disabled = currentIndex === -1 || currentIndex >= pages.length - 1;
    }
    if (bottomText) {
      bottomText.textContent = `صفحة ${toArabicNumerals(pageNum)}`;
    }
  }

  window.goToPrevPage = function () {
    const pages = getFilteredPages();
    const currentIndex = pages.findIndex(p => p.pageNumber === currentPageNumber);
    if (currentIndex > 0) {
      const prev = pages[currentIndex - 1];
      currentPageNumber = prev.pageNumber;
      currentSurahId = prev.surahId;
      renderCurrentPage();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  window.goToNextPage = function () {
    const pages = getFilteredPages();
    const currentIndex = pages.findIndex(p => p.pageNumber === currentPageNumber);
    if (currentIndex >= 0 && currentIndex < pages.length - 1) {
      const next = pages[currentIndex + 1];
      currentPageNumber = next.pageNumber;
      currentSurahId = next.surahId;
      renderCurrentPage();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  window.changeSurah = function (surahId) {
    selectedSurahFilter = surahId;
    saveProgress(currentPageNumber);

    if (surahId === 'all') {
      populatePageSelect();
      renderCurrentPage();
    } else {
      const surah = quranWirdData.surahs.find(s => s.id === surahId);
      if (surah && surah.pages.length > 0) {
        currentSurahId = surah.id;
        const pageExists = surah.pages.some(p => p.pageNumber === currentPageNumber);
        if (!pageExists) {
          currentPageNumber = surah.pages[0].pageNumber;
        }
        populatePageSelect();
        renderCurrentPage();
      }
    }
  };

  window.changePage = function (pageNum) {
    const pNum = parseInt(pageNum, 10);
    if (isNaN(pNum)) return;
    currentPageNumber = pNum;
    quranWirdData.surahs.forEach(s => {
      if (s.pages.some(p => p.pageNumber === pNum)) {
        currentSurahId = s.id;
      }
    });

    if (selectedSurahFilter !== 'all' && selectedSurahFilter !== currentSurahId) {
      selectedSurahFilter = currentSurahId;
      populateSurahSelect();
    }

    renderCurrentPage();
  };

  window.adjustFontSize = function (delta) {
    currentFontSize += delta;
    if (currentFontSize < 1.2) currentFontSize = 1.2;
    if (currentFontSize > 2.6) currentFontSize = 2.6;
    const vc = document.getElementById('mushafVersesContainer');
    if (vc) vc.style.fontSize = currentFontSize + 'rem';
  };

  window.resetFontSize = function () {
    currentFontSize = 1.75;
    const vc = document.getElementById('mushafVersesContainer');
    if (vc) vc.style.fontSize = currentFontSize + 'rem';
  };

  window.scrollToTafseerAyah = function (ayahNum) {
    const el = document.getElementById('tafseer-ayah-' + ayahNum);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.borderColor = 'var(--accent-amber)';
      setTimeout(() => {
        el.style.borderColor = '';
      }, 1500);
    }
  };

  window.toggleDailyRead = function () {
    const today = new Date().toISOString().slice(0, 10);
    const lastReadDate = localStorage.getItem('quran_last_read_date');
    let streak = parseInt(localStorage.getItem('quran_streak_count') || '0', 10);

    if (lastReadDate === today) {
      localStorage.removeItem('quran_last_read_date');
      streak = Math.max(0, streak - 1);
      localStorage.setItem('quran_streak_count', streak.toString());
      updateStreakDisplay();
      showToastNotification('تم إلغاء تحديد الورد لليوم');
    } else {
      if (lastReadDate) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (lastReadDate === yesterday) {
          streak += 1;
        } else {
          streak = 1;
        }
      } else {
        streak = 1;
      }
      localStorage.setItem('quran_last_read_date', today);
      localStorage.setItem('quran_streak_count', streak.toString());
      updateStreakDisplay();
      showToastNotification('🤍 بارك الله فيك وتقبل طاعتك! تم إنجاز ورد اليوم');
    }
  };

  function updateStreakDisplay() {
    const today = new Date().toISOString().slice(0, 10);
    const lastReadDate = localStorage.getItem('quran_last_read_date');
    const streak = parseInt(localStorage.getItem('quran_streak_count') || '0', 10);

    const btn = document.getElementById('toggleDailyReadBtn');
    const streakText = document.getElementById('streakCountDisplay');

    if (streakText) {
      streakText.textContent = `🔥 الاستمرار: ${toArabicNumerals(streak)} يوم`;
    }

    if (btn) {
      if (lastReadDate === today) {
        btn.classList.add('completed');
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>تمت قراءة ورد اليوم بنجاح ✓</span>';
      } else {
        btn.classList.remove('completed');
        btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> <span>تحديد: تم قراءة ورد اليوم</span>';
      }
    }
  }

  function toArabicNumerals(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, d => arabicDigits[d]);
  }

  function setupEventListeners() {
    const surahSelect = document.getElementById('surahSelect');
    if (surahSelect) {
      surahSelect.addEventListener('change', function () {
        window.changeSurah(this.value);
      });
    }
    const pageSelect = document.getElementById('pageSelect');
    if (pageSelect) {
      pageSelect.addEventListener('change', function () {
        window.changePage(this.value);
      });
    }
  }

  function showToastNotification(msg) {
    let toast = document.getElementById('globalFeedbackToast');
    if (toast) toast.remove();
    toast = document.createElement('div');
    toast.id = 'globalFeedbackToast';
    toast.className = 'global-feedback-toast animate-fade-in';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(function () {
      if (toast) toast.remove();
    }, 3800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuranApp);
  } else {
    initQuranApp();
  }
})();
