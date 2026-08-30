import React, { useState, useEffect, useRef } from 'react';
import './ThemePicker.css';

export const THEME_SWATCHES = [
  { id: '', label: 'الافتراضي (Blueprint)', color: '#1B2A4A', border: '#F59E0B' },
  { id: 'theme-blue', label: 'Blue', color: '#3b82f6' },
  { id: 'theme-green', label: 'Green', color: '#10b981' },
  { id: 'theme-purple', label: 'Purple', color: '#8b5cf6' },
  { id: 'theme-orange', label: 'Orange', color: '#f97316' },
  { id: 'theme-red', label: 'Red', color: '#ef4444' },
  { id: 'theme-pink', label: 'Pink', color: '#ec4899' },
  { id: 'theme-yellow', label: 'Yellow', color: '#eab308' },
  { id: 'theme-cyan', label: 'Cyan', color: '#06b6d4' },
  { id: 'theme-lime', label: 'Lime', color: '#84cc16' },
  { id: 'theme-teal', label: 'Teal', color: '#14b8a6' },
  { id: 'theme-magenta', label: 'Magenta', color: '#d946ef' },
  { id: 'theme-maroon', label: 'Maroon', color: '#9f1239' },
  { id: 'theme-navy', label: 'Navy', color: '#1e3a8a' },
  { id: 'theme-gray', label: 'Gray', color: '#64748b' },
  { id: 'theme-black', label: 'Dark Slate', color: '#0f172a' },
];

export const applyColorTheme = (themeId) => {
  // Remove existing theme-* classes from body
  const currentClasses = document.body.className
    .split(' ')
    .filter((c) => !c.startsWith('theme-'))
    .join(' ');
  
  if (themeId) {
    document.body.className = `${currentClasses} ${themeId}`.trim();
    localStorage.setItem('ui-theme', themeId);
  } else {
    document.body.className = currentClasses.trim();
    localStorage.removeItem('ui-theme');
  }
  window.dispatchEvent(new Event('ce_theme_changed'));
};

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('ui-theme') || '');
  const menuRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('ui-theme') || '';
    setActiveTheme(saved);
    if (saved) {
      document.body.classList.add(saved);
    }

    const handleThemeChange = () => {
      setActiveTheme(localStorage.getItem('ui-theme') || '');
    };

    window.addEventListener('ce_theme_changed', handleThemeChange);
    return () => window.removeEventListener('ce_theme_changed', handleThemeChange);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (id) => {
    applyColorTheme(id);
    setActiveTheme(id);
    setIsOpen(false);
  };

  return (
    <div className="theme-popover-wrapper" ref={menuRef}>
      <button
        type="button"
        className={`theme-palette-nav-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="تخصيص لون المظهر"
        aria-label="تغيير لون السمة"
      >
        <i className="fa-solid fa-palette"></i>
      </button>

      {isOpen && (
        <div className="theme-popover-dropdown animate-fade-in" dir="rtl">
          <div className="theme-popover-header">
            <div className="theme-header-text">
              <i className="fa-solid fa-swatchbook"></i>
              <span>لون السمة والخلفية</span>
            </div>
            {activeTheme && (
              <button
                type="button"
                className="theme-reset-link"
                onClick={() => handleSelect('')}
              >
                استعادة الافتراضي
              </button>
            )}
          </div>

          <div className="theme-swatches-grid">
            {THEME_SWATCHES.map((th) => {
              const isSelected = activeTheme === th.id;
              return (
                <button
                  key={th.id || 'default'}
                  type="button"
                  className={`theme-swatch-circle ${isSelected ? 'selected' : ''}`}
                  style={{
                    backgroundColor: th.color,
                    borderColor: th.border || 'var(--border-default)',
                  }}
                  onClick={() => handleSelect(th.id)}
                  title={th.label}
                >
                  {isSelected && <i className="fa-solid fa-check check-mark"></i>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
