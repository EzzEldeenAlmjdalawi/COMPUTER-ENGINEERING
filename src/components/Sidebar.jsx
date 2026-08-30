import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { THEME_SWATCHES, applyColorTheme } from './ThemePicker';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose, activePage = "", onOpenFavorites, onOpenPomodoro }) {
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('ui-theme') || '');

  useEffect(() => {
    const handleThemeChange = () => {
      setActiveTheme(localStorage.getItem('ui-theme') || '');
    };
    window.addEventListener('ce_theme_changed', handleThemeChange);
    return () => window.removeEventListener('ce_theme_changed', handleThemeChange);
  }, []);

  const sidebarLinks = [
    { href: 'index.html', label: 'الرئيسية', icon: 'fa-solid fa-house', id: 'home', badge: 'Home' },
    { href: 'firstYear.html', label: 'السنة الأولى', icon: 'fa-solid fa-cubes', id: 'firstYear', color: '#0EA5E9', badge: '1st Year' },
    { href: 'secndYear.html', label: 'السنة الثانية', icon: 'fa-solid fa-microchip', id: 'secndYear', color: '#10B981', badge: '2nd Year' },
    { href: 'thirdYear.html', label: 'السنة الثالثة', icon: 'fa-solid fa-network-wired', id: 'thirdYear', color: '#8B5CF6', badge: '3rd Year' },
    { href: 'fourthYear.html', label: 'السنة الرابعة', icon: 'fa-solid fa-laptop-code', id: 'fourthYear', color: '#F59E0B', badge: '4th Year' },
    { href: 'fifthYear.html', label: 'السنة الخامسة', icon: 'fa-solid fa-award', id: 'fifthYear', color: '#EC4899', badge: '5th Year' },
    { href: 'university-requirements.html', label: 'متطلبات الجامعة', icon: 'fa-solid fa-graduation-cap', id: 'requirements', color: '#06B6D4' },
    { href: 'gpa-calculator.html', label: 'حاسبة المعدل', icon: 'fa-solid fa-calculator', id: 'gpa', color: '#F59E0B', highlight: true },
    { href: 'study-tools.html', label: 'أدوات الدراسة والسبورة', icon: 'fa-solid fa-brain', id: 'studyTools', color: '#10B981' },
    { href: 'search.html', label: 'البحث الشامل', icon: 'fa-solid fa-magnifying-glass', id: 'search' },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div className="sidebar-backdrop animate-fade-in" onClick={onClose}></div>
      )}

      <aside className={`collapsible-sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`} dir="rtl">
        <div className="sidebar-inner">
          {/* Header */}
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <Logo size={36} />
              <div className="sidebar-brand-text">
                <span className="sb-title">COMPUTER ENG</span>
                <span className="sb-sub">IUG القائمة الجانبية</span>
              </div>
            </div>
            <button className="sidebar-close-btn" onClick={onClose} aria-label="إغلاق القائمة">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Quick Study Actions Bar */}
          <div className="sidebar-quick-tools">
            <button 
              type="button" 
              className="quick-tool-btn fav"
              onClick={() => { onClose(); onOpenFavorites && onOpenFavorites(); }}
            >
              <i className="fa-solid fa-star"></i>
              <span>المفضلة</span>
            </button>
            <button 
              type="button" 
              className="quick-tool-btn pomo"
              onClick={() => { onClose(); onOpenPomodoro && onOpenPomodoro(); }}
            >
              <i className="fa-solid fa-stopwatch"></i>
              <span>بومودورو</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            <span className="sidebar-section-label">التنقل الأكاديمي</span>
            <div className="sidebar-links-list">
              {sidebarLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`sidebar-nav-item ${activePage === item.id ? 'active' : ''} ${item.highlight ? 'highlight-item' : ''}`}
                  onClick={onClose}
                >
                  <div className="sb-item-icon" style={{ color: item.color || 'var(--text-main)' }}>
                    <i className={item.icon}></i>
                  </div>
                  <span className="sb-item-label">{item.label}</span>
                  {item.badge && <span className="sb-badge">{item.badge}</span>}
                </a>
              ))}
            </div>
          </nav>

          {/* Theme Accent Swatches in Sidebar */}
          <div className="sidebar-theme-section">
            <div className="sb-theme-head">
              <span className="sidebar-section-label">تخصيص لون السمة</span>
              {activeTheme && (
                <button
                  type="button"
                  className="sb-theme-reset"
                  onClick={() => { applyColorTheme(''); setActiveTheme(''); }}
                >
                  الافتراضي
                </button>
              )}
            </div>
            <div className="sb-swatches-grid">
              {THEME_SWATCHES.map((th) => {
                const isSelected = activeTheme === th.id;
                return (
                  <button
                    key={th.id || 'sb-default'}
                    type="button"
                    className={`sb-swatch-btn ${isSelected ? 'selected' : ''}`}
                    style={{
                      backgroundColor: th.color,
                      borderColor: th.border || 'var(--border-default)',
                    }}
                    onClick={() => {
                      applyColorTheme(th.id);
                      setActiveTheme(th.id);
                    }}
                    title={th.label}
                  >
                    {isSelected && <i className="fa-solid fa-check"></i>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact / Help Footer */}
          <div className="sidebar-footer">
            <span className="sidebar-section-label">الدعم والتواصل</span>
            <div className="sb-contact-quick">
              <a href="tel:0595346617" className="sb-contact-chip">
                <i className="fa-solid fa-phone"></i>
                <span dir="ltr">0595346617</span>
              </a>
              <a href="mailto:mnmaassddll@gmail.com" className="sb-contact-chip" title="راسلني عبر الإيميل">
                <i className="fa-solid fa-paper-plane"></i>
                <span>راسلني (Email)</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
