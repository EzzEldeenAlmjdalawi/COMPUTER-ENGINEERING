import React, { useState, useEffect, useRef } from 'react';
import { allSubjects, normalizeId, isLabCourse } from '../data/subjects';
import './SearchBar.css';

export default function SearchBar({ placeholder = "ابحث عن مادة أو دكتور أو محتوى...", autoFocus = false }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const cleanQ = query.trim().toLowerCase();
    const filtered = allSubjects.filter(sub => {
      const nameMatch = sub.name.toLowerCase().includes(cleanQ);
      const altMatch = sub.altName && sub.altName.toLowerCase().includes(cleanQ);
      const yearMatch = sub.yearTitleAr && sub.yearTitleAr.includes(cleanQ);
      return nameMatch || altMatch || yearMatch;
    });

    setResults(filtered.slice(0, 8)); // Top 8 results
    setIsOpen(true);
  }, [query]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (sub) => {
    const subjectId = normalizeId(sub.name);
    const semesterId = normalizeId(sub.semester);
    
    // Save for accordion auto-opening
    localStorage.setItem('openSemester', semesterId);
    
    const targetUrl = `${sub.year}.html#${subjectId}`;
    
    // If we're already on that page, trigger smooth scroll & accordion
    if (window.location.pathname.endsWith(`${sub.year}.html`)) {
      window.location.hash = subjectId;
      const el = document.getElementById(subjectId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('subject-highlight');
        setTimeout(() => el.classList.remove('subject-highlight'), 3000);
      }
      setIsOpen(false);
      setQuery('');
    } else {
      window.location.href = targetUrl;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="search-bar-wrapper" ref={containerRef}>
      <div className="search-input-box">
        <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          autoFocus={autoFocus}
          dir="rtl"
        />
        {query && (
          <button 
            className="clear-search-btn" 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            title="مسح البحث"
            type="button"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="search-dropdown animate-fade-in" dir="rtl">
          {results.length > 0 ? (
            <div className="search-results-list">
              <div className="search-results-header">
                <span>نتائج البحث ({results.length})</span>
              </div>
              {results.map((sub, idx) => (
                <div
                  key={`${sub.year}-${sub.name}-${idx}`}
                  className="search-result-item"
                  onClick={() => handleSelect(sub)}
                >
                  <div className="search-item-info">
                    <div className="search-item-title">
                      <span>{sub.name}</span>
                      {isLabCourse(sub.name) && <span className="lab-badge">مختبر Lab</span>}
                    </div>
                    <div className="search-item-meta">
                      <span className="meta-tag year-tag">{sub.yearTitleAr}</span>
                      <span className="meta-separator">•</span>
                      <span className="meta-tag sem-tag">{sub.semesterTitleAr}</span>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-left item-arrow"></i>
                </div>
              ))}
            </div>
          ) : (
            <div className="search-no-results">
              <i className="fa-solid fa-circle-question no-res-icon"></i>
              <p>لم يتم العثور على مواد مطابقة لـ "{query}"</p>
              <span>جرب البحث باسم المادة بالإنجليزي أو العربي أو اسم المحاضر</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
