import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Sidebar from './Sidebar';
import FavoritesModal, { getFavorites } from './FavoritesModal';
import PomodoroWidget from './PomodoroWidget';
import './Navbar.css';

export default function Navbar({ activePage = '' }) {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [pomodoroOpen, setPomodoroOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDark(true);
    } else if (saved === 'light') {
      document.body.classList.remove('dark-mode');
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark-mode');
        setIsDark(true);
      }
    }

    const updateFavs = () => setFavCount(getFavorites().length);
    updateFavs();
    window.addEventListener('ce_favorites_updated', updateFavs);
    return () => window.removeEventListener('ce_favorites_updated', updateFavs);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('themeMode', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('themeMode', 'light');
    }
  };

  const navLinks = [
    { href: 'index.html', label: 'الرئيسية', icon: 'fa-solid fa-house', id: 'home' },
    { href: 'firstYear.html', label: 'السنة الأولى', icon: 'fa-solid fa-cubes', id: 'firstYear' },
    { href: 'secndYear.html', label: 'السنة الثانية', icon: 'fa-solid fa-microchip', id: 'secndYear' },
    { href: 'thirdYear.html', label: 'السنة الثالثة', icon: 'fa-solid fa-network-wired', id: 'thirdYear' },
    { href: 'fourthYear.html', label: 'السنة الرابعة', icon: 'fa-solid fa-laptop-code', id: 'fourthYear' },
    { href: 'fifthYear.html', label: 'السنة الخامسة', icon: 'fa-solid fa-award', id: 'fifthYear' },
    { href: 'university-requirements.html', label: 'متطلبات الجامعة', icon: 'fa-solid fa-graduation-cap', id: 'requirements' },
    { href: 'gpa-calculator.html', label: 'حاسبة المعدل', icon: 'fa-solid fa-calculator', id: 'gpa', highlight: true },
    { href: 'study-tools.html', label: 'ادرس من هان 🎓', icon: 'fa-solid fa-brain', id: 'studyTools' },
  ];

  return (
    <>
      <header className={`unified-navbar ${scrolled ? 'is-scrolled' : ''}`} dir="rtl">
        <div className="navbar-container">
          {/* Sidebar Toggle + Brand */}
          <div className="navbar-left-group">
            <button
              type="button"
              className="sidebar-trigger-btn"
              onClick={() => setSidebarOpen(true)}
              title="فتح القائمة الجانبية"
              aria-label="القائمة الجانبية"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>

            <a href="index.html" className="brand-logo-link">
              <Logo size={36} />
              <div className="brand-text-group">
                <span className="brand-title">COMPUTER ENGINEERING</span>
                <span className="brand-sub">IUG <span className="brand-dot"></span> الجامعة الإسلامية</span>
              </div>
            </a>
          </div>

          {/* Global Search Center */}
          <div className="navbar-search-area">
            <SearchBar />
          </div>

          {/* Action Controls & Study Tools */}
          <div className="navbar-actions">
            {/* Quick Favorites Star Button */}
            <button
              type="button"
              className={`action-icon-pill ${favCount > 0 ? 'has-badge' : ''}`}
              onClick={() => setFavoritesOpen(true)}
              title="المواد المفضلة والمحفوظة"
            >
              <i className="fa-solid fa-star text-amber"></i>
              <span className="pill-text">المفضلة</span>
              {favCount > 0 && <span className="count-tag">{favCount}</span>}
            </button>

            {/* Quick Pomodoro Button */}
            <button
              type="button"
              className="action-icon-pill pomo-pill-btn"
              onClick={() => setPomodoroOpen(true)}
              title="مؤقت بومودورو الدراسي"
            >
              <i className="fa-solid fa-stopwatch text-teal"></i>
              <span className="pill-text">بومودورو</span>
            </button>

            {/* Telegram Channel */}
            <a
              href="https://t.me/+lUyeZmUh7KpjM2Fi"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn tg-btn"
              title="قناة التليجرام الرسمية"
            >
              <i className="fa-brands fa-telegram"></i>
              <span className="action-label">القناة</span>
            </a>

            {/* Telegram Bot */}
            <a
              href="http://t.me/iug_computer_Enfuneering_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn bot-btn"
              title="بوت الملفات والبرامج"
            >
              <i className="fa-solid fa-robot"></i>
              <span className="action-label">بوت الملفات</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="theme-toggle-btn"
              title={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الليلي"}
              aria-label="تبديل الوضع الليلي"
              type="button"
            >
              <i className={isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة الرئيسية"
              type="button"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* Desktop Sub Navigation Bar */}
        <nav className="desktop-subnav">
          <div className="subnav-container">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`subnav-link ${activePage === link.id ? 'active' : ''} ${link.highlight ? 'highlight-btn' : ''}`}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-drawer-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-drawer-header">
                <div className="brand-logo-link">
                  <Logo size={32} />
                  <div className="brand-text-group">
                    <span className="brand-title">COMPUTER ENG</span>
                    <span className="brand-sub">IUG منصة هندسة الحاسوب</span>
                  </div>
                </div>
                <button 
                  className="close-drawer-btn" 
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="إغلاق"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="mobile-search-wrapper">
                <SearchBar placeholder="ابحث عن مادة..." />
              </div>

              {/* Mobile Quick Study Tools */}
              <div className="mobile-tools-bar">
                <button
                  type="button"
                  className="m-tool-btn fav"
                  onClick={() => { setMobileMenuOpen(false); setFavoritesOpen(true); }}
                >
                  <i className="fa-solid fa-star"></i>
                  <span>المفضلة ({favCount})</span>
                </button>
                <button
                  type="button"
                  className="m-tool-btn pomo"
                  onClick={() => { setMobileMenuOpen(false); setPomodoroOpen(true); }}
                >
                  <i className="fa-solid fa-stopwatch"></i>
                  <span>بومودورو</span>
                </button>
              </div>

              <div className="mobile-nav-links">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`mobile-nav-link ${activePage === link.id ? 'active' : ''} ${link.highlight ? 'mobile-highlight' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="mobile-link-icon">
                      <i className={link.icon}></i>
                    </div>
                    <span>{link.label}</span>
                    <i className="fa-solid fa-chevron-left mobile-arrow"></i>
                  </a>
                ))}
              </div>

              <div className="mobile-drawer-footer">
                <a
                  href="https://t.me/+lUyeZmUh7KpjM2Fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link tg"
                >
                  <i className="fa-brands fa-telegram"></i>
                  <span>قناة التليجرام</span>
                </a>
                <a
                  href="http://t.me/iug_computer_Enfuneering_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link bot"
                >
                  <i className="fa-solid fa-robot"></i>
                  <span>بوت الملفات</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Collapsible Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onOpenFavorites={() => setFavoritesOpen(true)}
        onOpenPomodoro={() => setPomodoroOpen(true)}
      />

      {/* Global Favorites Modal */}
      <FavoritesModal
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />

      {/* Global Floating Pomodoro Widget */}
      <PomodoroWidget
        isOpen={pomodoroOpen}
        onClose={() => setPomodoroOpen(false)}
      />
    </>
  );
}
