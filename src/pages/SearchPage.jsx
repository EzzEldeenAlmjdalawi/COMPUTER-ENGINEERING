import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EmptyStateIllustration } from '../components/Illustrations';
import { allSubjects, normalizeId, isLabCourse } from '../data/subjects';
import './SearchPage.css';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // all, theory, lab

  const filteredSubjects = useMemo(() => {
    let list = allSubjects;

    if (selectedYear !== 'all') {
      list = list.filter((s) => s.year === selectedYear);
    }

    if (selectedType === 'lab') {
      list = list.filter((s) => isLabCourse(s.name));
    } else if (selectedType === 'theory') {
      list = list.filter((s) => !isLabCourse(s.name));
    }

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.altName && s.altName.toLowerCase().includes(q)) ||
          s.yearTitleAr.includes(q) ||
          s.semesterTitleAr.includes(q)
      );
    }

    return list;
  }, [searchTerm, selectedYear, selectedType]);

  const handleSubjectClick = (sub) => {
    const subjectId = normalizeId(sub.name);
    const semId = normalizeId(sub.semester);
    localStorage.setItem('openSemester', semId);
    window.location.href = `${sub.year}.html#${subjectId}`;
  };

  return (
    <div className="search-page-root" dir="rtl">
      <Navbar />

      <main className="container search-main-container">
        {/* Header */}
        <div className="search-header-box">
          <div className="tech-badge">
            <span className="dot"></span>
            <span>البحث والاستكشاف السريع</span>
          </div>
          <h1>فهرس البحث الشامل للمواد</h1>
          <p>ابحث باسم المادة، كود المساق، الفصل الدراسي، أو اسم المحاضر</p>

          {/* Search Input Box */}
          <div className="main-search-input-wrapper">
            <i className="fa-solid fa-magnifying-glass main-search-icon"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="اكتب اسم المادة بالعربي أو الإنجليزي..."
              className="main-search-field"
              autoFocus
            />
            {searchTerm && (
              <button 
                className="main-clear-btn" 
                onClick={() => setSearchTerm('')}
                type="button"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="filters-row">
            <div className="filter-group">
              <label>السنة الدراسية:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
              >
                <option value="all">جميع السنوات</option>
                <option value="firstYear">السنة الأولى</option>
                <option value="secndYear">السنة الثانية</option>
                <option value="thirdYear">السنة الثالثة</option>
                <option value="fourthYear">السنة الرابعة</option>
                <option value="fifthYear">السنة الخامسة</option>
              </select>
            </div>

            <div className="filter-group">
              <label>نوع المساق:</label>
              <div className="type-buttons-group">
                <button
                  type="button"
                  className={`type-btn ${selectedType === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedType('all')}
                >
                  الكل
                </button>
                <button
                  type="button"
                  className={`type-btn ${selectedType === 'theory' ? 'active' : ''}`}
                  onClick={() => setSelectedType('theory')}
                >
                  نظري
                </button>
                <button
                  type="button"
                  className={`type-btn ${selectedType === 'lab' ? 'active' : ''}`}
                  onClick={() => setSelectedType('lab')}
                >
                  مختبر عملي
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-status-bar">
          <span>تم العثور على <strong>{filteredSubjects.length}</strong> مادة</span>
        </div>

        {/* Results Grid */}
        {filteredSubjects.length === 0 ? (
          <div className="search-empty-state-card">
            <EmptyStateIllustration width={180} height={140} />
            <h3>لم يتم العثور على أي مادة مطابقة للبحث</h3>
            <p>جرّب تغيير كلمات البحث أو تغيير فلتر السنة أو نوع المادة (نظري / عملي)</p>
          </div>
        ) : (
          <div className="search-results-grid">
            {filteredSubjects.map((sub, idx) => (
              <div
                key={`${sub.year}-${sub.name}-${idx}`}
                className="search-card-item"
                onClick={() => handleSubjectClick(sub)}
              >
                <div className="search-card-top">
                  <div className="search-card-icon">
                    <i className={isLabCourse(sub.name) ? 'fa-solid fa-flask' : 'fa-solid fa-book'}></i>
                  </div>
                  <div className="search-card-badges">
                    {isLabCourse(sub.name) && <span className="badge-lab">مختبر Lab</span>}
                    <span className="badge-year">{sub.yearTitleAr}</span>
                  </div>
                </div>

                <div className="search-card-body">
                  <h3 className="search-card-name">{sub.name}</h3>
                  <span className="search-card-sem">{sub.semesterTitleAr}</span>
                </div>

                <div className="search-card-footer">
                  <span>عرض الملفات والمحاضرات</span>
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Universal Engineering Footer */}
      <Footer />
    </div>
  );
}
