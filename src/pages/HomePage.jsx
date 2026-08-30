import React from 'react';
import Navbar from '../components/Navbar';
import PrayerWidget from '../components/PrayerWidget';
import ReminderWidget from '../components/ReminderWidget';
import Footer from '../components/Footer';
import { HeroIllustration } from '../components/Illustrations';
import './HomePage.css';

export default function HomePage() {
  const yearsList = [
    {
      href: 'firstYear.html',
      title: 'First Year',
      titleAr: 'السنة الأولى',
      icon: 'fa-solid fa-cubes',
      desc: 'الرياضيات، الفيزياء، ومقدمات البرمجة والهندسة',
      color: '#0EA5E9',
    },
    {
      href: 'secndYear.html',
      title: 'Second Year',
      titleAr: 'السنة الثانية',
      icon: 'fa-solid fa-microchip',
      desc: 'البرمجة المتقدمة، الدوائر الكهربائية، والتصميم الرقمي',
      color: '#10B981',
    },
    {
      href: 'thirdYear.html',
      title: 'Third Year',
      titleAr: 'السنة الثالثة',
      icon: 'fa-solid fa-network-wired',
      desc: 'معمارية الحاسوب، هياكل البيانات، والإشارات والأنظمة',
      color: '#8B5CF6',
    },
    {
      href: 'fourthYear.html',
      title: 'Fourth Year',
      titleAr: 'السنة الرابعة',
      icon: 'fa-solid fa-laptop-code',
      desc: 'نظم التشغيل، شبكات الحاسوب، والأنظمة المدمجة وVHDL',
      color: '#F59E0B',
    },
    {
      href: 'fifthYear.html',
      title: 'Fifth Year',
      titleAr: 'السنة الخامسة',
      icon: 'fa-solid fa-award',
      desc: 'الذكاء الاصطناعي، أمن الشبكات، ومساقات التخرج',
      color: '#EC4899',
    },
    {
      href: 'university-requirements.html',
      title: 'متطلبات الجامعة',
      titleAr: 'المساقات العامة الإجبارية والاختيارية',
      icon: 'fa-solid fa-graduation-cap',
      desc: 'القرآن الكريم، العقيدة، اللغة العربية والدراسات الفلسطينية',
      color: '#06B6D4',
      isReq: true,
    },
    {
      href: 'gpa-calculator.html',
      title: 'GPA Calculator',
      titleAr: 'حاسبة المعدل التراكمي والفصلي',
      icon: 'fa-solid fa-calculator',
      desc: 'احسب معدلك التراكمي وتوقع معدل الفصول القادمة بنظام الجامعة 0–100',
      color: '#F59E0B',
      isGpa: true,
    },
  ];

  return (
    <div className="homepage-root" dir="rtl">
      {/* Global Unified Sticky Navbar */}
      <Navbar activePage="home" />

      {/* Announcement Ticker */}
      <div className="ticker-banner">
        <div className="container ticker-flex">
          <div className="ticker-label">
            <i className="fa-solid fa-bullhorn"></i>
            <span>إشعار المنصة</span>
          </div>
          <div className="ticker-content">
            <p className="ticker-text">
              📢 تم بحمد الله ترقية وتحديث منصة هندسة الحاسوب بالكامل، مع حاسبة المعدل التراكمي 0–100، أدوات المفضلة والمذاكرة، وتوفير كافة الملفات بروابط مباشرة! 
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <main className="homepage-main container">
        <div className="home-layout-grid">
          {/* Main Content Side */}
          <section className="home-content-side">
            {/* Hero Banner with Illustration */}
            <div className="hero-box">
              <div className="hero-grid-inner">
                <div className="hero-text-col">
                  <div className="tech-badge">
                    <span className="dot"></span>
                    <span>الجامعة الإسلامية بغزة • قسم هندسة الحاسوب</span>
                  </div>

                  <h1 className="hero-main-title">
                    COMPUTER ENGINEERING <span className="highlight-iug">IUG</span>
                  </h1>
                  
                  <p className="hero-desc">
                    المنصة الهندسية المتكاملة — هنا تجد جميع المقررات، الكتب، السلايدات، ملخصات الفصول، تسجيلات المحاضرات، وتجارب المعامل وحاسبة المعدل لكافة المستويات الدراسية.
                  </p>

                  {/* Quick Stats Grid */}
                  <div className="stats-row">
                    <div className="stat-card">
                      <span className="stat-value">5</span>
                      <span className="stat-label">سنوات دراسية</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-value">+1200</span>
                      <span className="stat-label">ملف ومصدر دراسي</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-value">100%</span>
                      <span className="stat-label">مجاني ومتاح دائماً</span>
                    </div>
                  </div>
                </div>

                <div className="hero-illustration-col">
                  <HeroIllustration />
                </div>
              </div>
            </div>

            {/* Academic Years Section */}
            <div className="years-section">
              <div className="section-head">
                <h2 className="section-title">
                  <i className="fa-solid fa-folder-tree"></i>
                  <span>السنوات الدراسية والمقررات</span>
                </h2>
                <span className="section-subtitle">اختر السنة لتصفح فصولها وموادها وروابطها</span>
              </div>

              <div className="years-grid">
                {yearsList.map((yr, idx) => (
                  <a
                    key={yr.href}
                    href={yr.href}
                    className={`year-nav-card ${yr.isReq ? 'req-special-card' : ''} ${yr.isGpa ? 'gpa-special-card' : ''}`}
                    style={{ '--card-accent': yr.color }}
                  >
                    <div className="year-card-top">
                      <div className="year-icon-circle" style={{ color: yr.color, borderColor: yr.color }}>
                        <i className={yr.icon}></i>
                      </div>
                      <span className="year-index-tag">0{idx + 1}</span>
                    </div>

                    <div className="year-card-body">
                      <h3 className="year-card-title">{yr.title}</h3>
                      <span className="year-card-arabic">{yr.titleAr}</span>
                      <p className="year-card-desc">{yr.desc}</p>
                    </div>

                    <div className="year-card-footer">
                      <span>{yr.isGpa ? 'فتح الحاسبة' : 'تصفح المواد'}</span>
                      <i className="fa-solid fa-arrow-left"></i>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar Services */}
          <aside className="home-sidebar">
            {/* Prayer Times Widget */}
            <PrayerWidget />

            {/* Quran / Motivational Reminder */}
            <ReminderWidget />

            {/* GPA Calculator Quick Banner */}
            <div className="gpa-promo-card">
              <div className="promo-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                <i className="fa-solid fa-calculator"></i>
              </div>
              <h3>حاسبة المعدل التراكمي (0–100)</h3>
              <p>احسب معدلك بدقة متناهية وفق الخطة الأكاديمية الرسمية وتوقع معدل الفصل القادم</p>
              <a href="gpa-calculator.html" className="promo-btn gpa-btn">
                <span>احسب معدلك الآن</span>
                <i className="fa-solid fa-arrow-left"></i>
              </a>
            </div>

            {/* Study Tools Banner */}
            <div className="study-tools-promo-card">
              <div className="promo-icon">
                <i className="fa-solid fa-brain"></i>
              </div>
              <h3>أدوات المذاكرة والسبورة</h3>
              <p>استخدم أدوات الملاحظات والسبورة الذكية ومراجع التعلم البرمجي</p>
              <a href="study-tools.html" className="promo-btn">
                <span>ادخل إلى أدوات الدراسة</span>
                <i className="fa-solid fa-arrow-left"></i>
              </a>
            </div>

            {/* Telegram Community Card */}
            <div className="community-box">
              <div className="community-header">
                <i className="fa-brands fa-telegram tg-icon"></i>
                <span>مجتمع التليجرام الهندسي</span>
              </div>
              <p>انضم لقناتنا ومجموعات الدفعة واستخدم البوت لتحميل التلخيصات والبرامج الهندسية مباشرة</p>
              <div className="community-actions">
                <a 
                  href="https://t.me/+lUyeZmUh7KpjM2Fi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="comm-btn channel"
                >
                  <i className="fa-solid fa-bullhorn"></i>
                  <span>القناة الرسمية</span>
                </a>
                <a 
                  href="http://t.me/iug_computer_Enfuneering_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="comm-btn bot"
                >
                  <i className="fa-solid fa-robot"></i>
                  <span>بوت الملفات</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Universal Engineering Footer */}
      <Footer />
    </div>
  );
}
