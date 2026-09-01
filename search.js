/**
 * SEARCH PAGE CONTROLLER (VANILLA JS)
 * Handles bilingual search input, course code matching, filtering by academic year / category / lab, and results rendering.
 */

(function () {
  'use strict';

  let currentCategory = 'all';
  let searchQuery = '';

  function normalizeSearchText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[\u064B-\u065F]/g, '') // remove Arabic tashkeel
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[\s\-_–—,.:/\\()]+/g, ''); // strip spaces & symbols for code matching
  }

  function initSearchPage() {
    const input = document.getElementById('searchPageInput');
    if (!input) return;

    // Check URL params safely
    let initialQ = '';
    try {
      const searchStr = (typeof window !== 'undefined' && window.location && window.location.search) ? window.location.search : '';
      const params = new URLSearchParams(searchStr);
      initialQ = params.get('q') || '';
    } catch (e) {
      initialQ = '';
    }

    input.value = initialQ;
    searchQuery = initialQ.trim();

    input.addEventListener('input', function () {
      searchQuery = input.value.trim();
      renderResults();
    });

    // Category chips
    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.dataset.category || 'all';
        renderResults();
      });
    });

    renderResults();
  }

  function renderResults() {
    const container = document.getElementById('searchResultsGrid');
    const countEl = document.getElementById('searchResultsCount');
    if (!container) return;

    const allSubs = (window.CE_DATA && window.CE_DATA.allSubjects) || [];
    const linksData = (window.CE_DATA && window.CE_DATA.subjectLinks) || {};
    const normalizedQuery = normalizeSearchText(searchQuery);
    const rawLowerQuery = searchQuery.toLowerCase();

    const filtered = allSubs.filter((s) => {
      // Category filter
      if (currentCategory === 'lab') {
        if (!s.isLab && !(window.CE_DATA && window.CE_DATA.isLabCourse(s.name))) return false;
      } else if (currentCategory === 'univ') {
        if (s.category !== 'متطلب جامعة') return false;
      } else if (currentCategory === 'faculty') {
        if (s.category !== 'متطلب كلية') return false;
      } else if (currentCategory === 'major') {
        if (s.category !== 'تخصص' && s.category !== 'تخصص اختياري') return false;
      } else if (currentCategory !== 'all') {
        if (s.year !== currentCategory) return false;
      }

      // Query filter
      if (!searchQuery) return true;

      const normName = normalizeSearchText(s.name);
      const normCode = normalizeSearchText(s.code);
      const normAlt = normalizeSearchText(s.altName);
      const normCat = normalizeSearchText(s.category);

      return (
        normName.includes(normalizedQuery) ||
        normCode.includes(normalizedQuery) ||
        normAlt.includes(normalizedQuery) ||
        normCat.includes(normalizedQuery) ||
        (s.name && s.name.toLowerCase().includes(rawLowerQuery)) ||
        (s.code && s.code.toLowerCase().includes(rawLowerQuery)) ||
        (s.altName && s.altName.toLowerCase().includes(rawLowerQuery))
      );
    });

    if (countEl) {
      countEl.textContent = `تم العثور على ${filtered.length} مساق`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="search-empty-state-card" style="grid-column: 1 / -1;">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="var(--bg-surface-subtle)" stroke="var(--border-default)" stroke-width="2"/>
            <path d="M50 50L70 70M70 50L50 70" stroke="var(--accent-amber)" stroke-width="3" stroke-linecap="round"/>
            <circle cx="60" cy="60" r="28" stroke="var(--text-subtle)" stroke-width="2" stroke-dasharray="4 4"/>
          </svg>
          <h3>لم يتم العثور على مساقات تطابق "${searchQuery}"</h3>
          <p>جرّب البحث باسم المادة (مثال: برمجة، كالكولس، دوائر) أو برمز المساق (مثال: ECOM 2401، ENGG 1101).</p>
        </div>
      `;
      return;
    }

    const favs = window.getFavorites ? window.getFavorites() : [];

    container.innerHTML = filtered
      .map((s) => {
        const links = linksData[s.name] || {};
        const linkKeys = Object.keys(links);
        const isLab = s.isLab || (window.CE_DATA && window.CE_DATA.isLabCourse(s.name));
        const isFav = favs.includes(s.name);

        return `
          <div class="search-result-card animate-fade-in">
            <div class="search-card-header">
              <div style="flex: 1;">
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.35rem;">
                  ${s.code ? `<span class="search-code-badge">${s.code}</span>` : ''}
                  ${s.category ? `<span class="search-cat-badge">${s.category}</span>` : ''}
                  ${isLab ? '<span class="badge-lab">مختبر / عملي</span>' : ''}
                </div>
                <h3 class="search-card-name">${s.name}</h3>
                <span style="font-size:0.8rem; color:var(--text-subtle);">${s.yearTitleAr || ''} • ${s.semesterTitleAr || ''}</span>
              </div>
              <button type="button" class="search-fav-btn ${isFav ? 'is-fav' : ''}" onclick="window.toggleFavorite('${s.name}'); window.renderSearchResults && window.renderSearchResults();" title="${isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}">
                <i class="${isFav ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i>
              </button>
            </div>

            <div class="search-card-links">
              ${
                linkKeys.length > 0
                  ? linkKeys
                      .map((k) => {
                        const url = links[k];
                        const isExt = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
                        const targetAttr = isExt ? 'target="_blank" rel="noopener noreferrer"' : 'target="_self"';
                        let iconClass = 'fa-solid fa-arrow-up-right-from-square';
                        if (k.toLowerCase().includes('slide')) iconClass = 'fa-solid fa-file-powerpoint';
                        else if (k.toLowerCase().includes('book')) iconClass = 'fa-solid fa-book';
                        else if (k.toLowerCase().includes('lec')) iconClass = 'fa-solid fa-chalkboard-user';
                        else if (k.toLowerCase().includes('chap')) iconClass = 'fa-solid fa-list-ol';
                        else if (k.toLowerCase().includes('lab')) iconClass = 'fa-solid fa-flask';
                        else if (k.toLowerCase().includes('exam') || k.toLowerCase().includes('quiz')) iconClass = 'fa-solid fa-file-circle-check';
                        return `<a href="${url}" ${targetAttr} class="search-mini-link"><i class="${iconClass}"></i> ${k}</a>`;
                      })
                      .join('')
                  : `<a href="${s.year}.html" class="search-mini-link" target="_self"><i class="fa-solid fa-book-open"></i> عرض في صفحة السنة</a>`
              }
            </div>
          </div>
        `;
      })
      .join('');
  }

  window.renderSearchResults = renderResults;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchPage);
  } else {
    initSearchPage();
  }
})();
