import React from 'react';
import Navbar from '../components/Navbar';
import ThemePicker from '../components/ThemePicker';
import SubjectAccordion from '../components/SubjectAccordion';
import Footer from '../components/Footer';
import { yearsConfig } from '../data/subjects';
import './YearPage.css';

export default function YearPage({ yearKey }) {
  const yearData = yearsConfig[yearKey];

  if (!yearData) {
    return (
      <div className="year-page-error" dir="rtl">
        <Navbar />
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2>لم يتم العثور على بيانات هذه السنة الدراسية</h2>
          <a href="index.html" className="btn-back-home">العودة للرئيسية</a>
        </div>
      </div>
    );
  }

  return (
    <div className="year-page-root" dir="rtl">
      {/* Unified Global Navbar */}
      <Navbar activePage={yearKey} />

      {/* Floating Theme Color Picker */}
      <ThemePicker />

      {/* Year Hero Header */}
      <header className="year-header-hero">
        <div className="container">
          <div className="year-hero-content" style={{ '--year-accent': yearData.accentColor }}>
            <div className="year-hero-badge">
              <i className={yearData.icon}></i>
              <span>{yearData.titleAr}</span>
            </div>

            <h1 className="year-hero-title">{yearData.title}</h1>
            <p className="year-hero-desc">{yearData.description}</p>

            {/* Quick Semesters Nav Pills */}
            <div className="semester-pills-row">
              {yearData.semesters.map((sem) => (
                <a
                  key={sem.id}
                  href={`#${sem.id}`}
                  className="sem-pill"
                >
                  <span className="pill-icon">{sem.icon}</span>
                  <span className="pill-title">{sem.title}</span>
                  <span className="pill-count">({sem.subjects.length} مساقات)</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Subjects Content */}
      <main className="year-main-content container main-container">
        <SubjectAccordion yearData={yearData} yearKey={yearKey} />
      </main>

      {/* Universal Engineering Footer */}
      <Footer />
    </div>
  );
}
