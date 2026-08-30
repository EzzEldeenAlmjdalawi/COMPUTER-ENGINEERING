import React, { useState, useEffect } from 'react';
import { subjectLinks, normalizeId, isLabCourse } from '../data/subjects';
import { getFavorites, toggleFavoriteSubject } from './FavoritesModal';
import ProgressChecklistModal from './ProgressChecklistModal';
import './SubjectAccordion.css';

const RESOURCE_ICONS = {
  "Lab": { icon: "fa-solid fa-flask", label: "المعمل واللاب", color: "#10B981" },
  "Recorded Videos": { icon: "fa-solid fa-circle-play", label: "فيديوهات مسجلة", color: "#EF4444" },
  "Book & Solutions": { icon: "fa-solid fa-book", label: "الكتاب والحلول", color: "#3B82F6" },
  "Lectures": { icon: "fa-solid fa-video", label: "المحاضرات", color: "#F59E0B" },
  "Chapters": { icon: "fa-solid fa-file-lines", label: "الشباتر والملخصات", color: "#8B5CF6" },
  "Slides": { icon: "fa-solid fa-file-powerpoint", label: "السلايدات", color: "#EC4899" },
  "Discussion & Problems & Problems solution": { icon: "fa-solid fa-pen-ruler", label: "المناقشة والمسائل", color: "#06B6D4" },
  "Quiz & Exams & Homework": { icon: "fa-solid fa-graduation-cap", label: "امتحانات وكويزات", color: "#F97316" },
};

export default function SubjectAccordion({ yearData, yearKey }) {
  // Store which semesters are expanded (default: open all or check localStorage)
  const [openSemesters, setOpenSemesters] = useState(() => {
    const initial = {};
    yearData.semesters.forEach((sem, idx) => {
      initial[sem.id] = true; // Open all by default for fast mobile access
    });
    return initial;
  });

  // Store which subject has active resource drawer open
  const [activeSubject, setActiveSubject] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [checklistSubject, setChecklistSubject] = useState(null);

  const refreshFavs = () => setFavorites(getFavorites());

  useEffect(() => {
    refreshFavs();
    window.addEventListener('ce_favorites_updated', refreshFavs);
    return () => window.removeEventListener('ce_favorites_updated', refreshFavs);
  }, []);

  const isFavorite = (subName) => favorites.some((f) => f.name === subName);

  // Check URL hash or localStorage for deep linking
  useEffect(() => {
    const openSemId = localStorage.getItem('openSemester');
    if (openSemId) {
      setOpenSemesters((prev) => ({ ...prev, [openSemId]: true }));
      localStorage.removeItem('openSemester');
    }

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        // Expand parent semester
        yearData.semesters.forEach((sem) => {
          const hasSubject = sem.subjects.some((s) => normalizeId(s.name) === hash);
          if (hasSubject) {
            setOpenSemesters((prev) => ({ ...prev, [sem.id]: true }));
            setActiveSubject(hash);
          }
        });

        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.classList.add('subject-highlight');
          setTimeout(() => targetEl.classList.remove('subject-highlight'), 5000);
        }, 150);
      }
    }
  }, [yearData]);

  const toggleSemester = (semId) => {
    setOpenSemesters((prev) => ({
      ...prev,
      [semId]: !prev[semId],
    }));
  };

  const toggleSubjectResources = (subjectId) => {
    setActiveSubject((prev) => (prev === subjectId ? null : subjectId));
  };

  return (
    <div className="accordion-root">
      {yearData.semesters.map((semester) => {
        const isOpen = openSemesters[semester.id];
        return (
          <div key={semester.id} className={`semester-card ${isOpen ? 'is-open' : ''}`}>
            {/* Semester Header Accordion Trigger */}
            <div
              className="semester-header-btn"
              onClick={() => toggleSemester(semester.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
            >
              <div className="semester-title-group">
                <span className="semester-badge-icon">{semester.icon}</span>
                <div>
                  <h2 className="semester-title">{semester.title}</h2>
                  <span className="semester-subtitle">{semester.titleAr} • {semester.subjects.length} مساقات</span>
                </div>
              </div>
              <div className="semester-arrow-box">
                <i className={`fa-solid fa-chevron-down sem-chevron ${isOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </div>

            {/* Semester Content / Subjects Grid */}
            {isOpen && (
              <div className="subjects-grid animate-fade-in" id={semester.id}>
                {semester.subjects.map((sub) => {
                  const subId = normalizeId(sub.name);
                  const isResourceOpen = activeSubject === subId;
                  const isLab = isLabCourse(sub.name);
                  const availableResources = subjectLinks[sub.name] || {};
                  const resourceKeys = Object.keys(availableResources);

                  return (
                    <div
                      key={sub.name}
                      id={subId}
                      className={`subject-box ${isLab ? 'is-lab-box' : ''} ${isResourceOpen ? 'is-expanded' : ''}`}
                    >
                      <div
                        className="subject-card-header"
                        onClick={() => toggleSubjectResources(subId)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="subject-info-main">
                          <div className="subject-icon-tag">
                            <i className={isLab ? "fa-solid fa-flask" : "fa-solid fa-book-bookmark"}></i>
                          </div>
                          <div className="subject-name-col">
                            <span className="subject-name-text">{sub.name}</span>
                            {isLab && <span className="lab-chip">مختبر Lab</span>}
                          </div>
                        </div>

                        <div className="subject-card-toggle">
                          <button
                            type="button"
                            className={`subject-action-star-btn ${isFavorite(sub.name) ? 'is-fav' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavoriteSubject({
                                name: sub.name,
                                year: yearKey,
                                yearTitleAr: yearData.titleAr,
                                semester: semester.title,
                              });
                            }}
                            title={isFavorite(sub.name) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                          >
                            <i className={isFavorite(sub.name) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                          </button>
                          <button
                            type="button"
                            className="subject-action-checklist-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setChecklistSubject(sub.name);
                            }}
                            title="متابعة الإنجاز والمذاكرة"
                          >
                            <i className="fa-solid fa-list-check"></i>
                          </button>
                          <span className="res-count-badge">{resourceKeys.length} مصادر</span>
                          <i className={`fa-solid fa-chevron-down sub-arrow ${isResourceOpen ? 'open' : ''}`}></i>
                        </div>
                      </div>

                      {/* Interactive Resource Drawer */}
                      {isResourceOpen && (
                        <div className="subject-resources-panel animate-fade-in">
                          <div className="resources-grid">
                            {resourceKeys.map((resKey) => {
                              const resUrl = availableResources[resKey];
                              const config = RESOURCE_ICONS[resKey] || {
                                icon: "fa-solid fa-link",
                                label: resKey,
                                color: "#0EA5E9",
                              };

                              return (
                                <a
                                  key={resKey}
                                  href={resUrl}
                                  target={resUrl.startsWith('http') ? '_blank' : '_self'}
                                  rel="noopener noreferrer"
                                  className="resource-card-btn"
                                  style={{ '--res-accent': config.color }}
                                >
                                  <div className="res-icon-wrapper" style={{ color: config.color }}>
                                    <i className={config.icon}></i>
                                  </div>
                                  <div className="res-details">
                                    <span className="res-type-title">{resKey}</span>
                                    <span className="res-type-arabic">{config.label}</span>
                                  </div>
                                  <i className="fa-solid fa-arrow-up-right-from-square res-external-icon"></i>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Progress Checklist Modal for selected subject */}
      <ProgressChecklistModal
        isOpen={!!checklistSubject}
        onClose={() => setChecklistSubject(null)}
        initialSubject={checklistSubject}
      />
    </div>
  );
}
