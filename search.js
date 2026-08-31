/**
 * SEARCH PAGE CONTROLLER (VANILLA JS)
 * Handles bilingual search input, filtering by academic year / lab, and results rendering.
 */

(function () {
  'use strict';

  let currentCategory = 'all';
  let searchQuery = '';

  function initSearchPage() {
    const input = document.getElementById('searchPageInput');
    if (!input) return;

    // Check URL params
    const params = new URLSearchParams(window.location.search);
    const initialQ = params.get('q') || '';
    input.value = initialQ;
    searchQuery = initialQ.trim().toLowerCase();

    input.addEventListener('input', function () {
      searchQuery = input.value.trim().toLowerCase();
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

    const filtered = allSubs.filter((s) => {
      // Category filter
      if (currentCategory === 'lab') {
        if (!s.isLab && !(window.CE_DATA && window.CE_DATA.isLabCourse(s.name))) return false;
      } else if (currentCategory !== 'all') {
        if (s.year !== currentCategory) return false;
      }

      // Query filter
      if (!searchQuery) return true;
      return (
        s.name.toLowerCase().includes(searchQuery) ||
        (s.altName && s.altName.toLowerCase().includes(searchQuery))
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
          <h3>لم يتم العثور على نتائج</h3>
          <p>جرّب البحث بكلمات أخرى أو اختر تصفية مختلفة من القائمة أعلاه.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered
      .map((s) => {
        const links = linksData[s.name] || {};
        const linkKeys = Object.keys(links);
        const isLab = s.isLab || (window.CE_DATA && window.CE_DATA.isLabCourse(s.name));

        return `
          <div class="search-result-card animate-fade-in">
            <div>
              <div class="search-card-header">
                <div>
                  <h3 class="search-card-name">${s.name}</h3>
                  <span style="font-size:0.8rem; color:var(--text-subtle);">${s.yearTitleAr} • ${s.semesterTitleAr}</span>
                </div>
                ${isLab ? '<span class="badge-lab">مختبر</span>' : ''}
              </div>
            </div>

            <div class="search-card-links">
              ${
                linkKeys.length > 0
                  ? linkKeys
                      .map((k) => {
                        const url = links[k];
                        const isExt = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
                        const targetAttr = isExt ? 'target="_blank" rel="noopener noreferrer"' : 'target="_self"';
                        return `<a href="${url}" ${targetAttr} class="search-mini-link">${k}</a>`;
                      })
                      .join('')
                  : `<a href="${s.year}.html" class="search-mini-link" target="_self">عرض في صفحة السنة</a>`
              }
            </div>
          </div>
        `;
      })
      .join('');
  }

  document.addEventListener('DOMContentLoaded', initSearchPage);
})();
