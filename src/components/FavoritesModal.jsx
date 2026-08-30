import React, { useState, useEffect } from 'react';
import { subjectLinks, normalizeId, isLabCourse } from '../data/subjects';
import { EmptyStateIllustration } from './Illustrations';
import './FavoritesModal.css';

export const getFavorites = () => {
  try {
    const raw = localStorage.getItem('ce_favorites');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const toggleFavoriteSubject = (subjectObj) => {
  try {
    const current = getFavorites();
    const exists = current.some((f) => f.name === subjectObj.name);
    let updated;
    if (exists) {
      updated = current.filter((f) => f.name !== subjectObj.name);
    } else {
      updated = [...current, subjectObj];
    }
    localStorage.setItem('ce_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('ce_favorites_updated'));
    return !exists;
  } catch (e) {
    return false;
  }
};

export default function FavoritesModal({ isOpen, onClose }) {
  const [favorites, setFavorites] = useState([]);

  const refresh = () => setFavorites(getFavorites());

  useEffect(() => {
    refresh();
    window.addEventListener('ce_favorites_updated', refresh);
    return () => window.removeEventListener('ce_favorites_updated', refresh);
  }, []);

  if (!isOpen) return null;

  const handleNavigate = (fav) => {
    const subjectId = normalizeId(fav.name);
    localStorage.setItem('openSemester', normalizeId(fav.semester || ''));
    window.location.href = `${fav.year}.html#${subjectId}`;
  };

  const handleRemove = (e, fav) => {
    e.stopPropagation();
    toggleFavoriteSubject(fav);
  };

  return (
    <div className="fav-modal-backdrop animate-fade-in" onClick={onClose} dir="rtl">
      <div className="fav-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fav-modal-header">
          <div className="fav-header-title">
            <i className="fa-solid fa-star fav-star-icon"></i>
            <div>
              <h3>المواد المحفوظة والمفضلة</h3>
              <span>({favorites.length}) مادة محفوظة للوصول السريع</span>
            </div>
          </div>
          <button className="fav-close-btn" onClick={onClose} aria-label="إغلاق">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content Body */}
        <div className="fav-modal-body">
          {favorites.length === 0 ? (
            <div className="fav-empty-state">
              <EmptyStateIllustration width={160} height={120} />
              <h4>لا توجد مواد في المفضلة بعد</h4>
              <p>انقر على أيقونة النجمة ⭐ بجانب أي مادة في صفحات السنوات لإضافتها هنا والوصول إليها بضغطة زر واحدة.</p>
            </div>
          ) : (
            <div className="fav-items-grid">
              {favorites.map((fav) => {
                const isLab = isLabCourse(fav.name);
                const resources = subjectLinks[fav.name] || {};
                const resCount = Object.keys(resources).length;

                return (
                  <div
                    key={fav.name}
                    className="fav-card-item"
                    onClick={() => handleNavigate(fav)}
                  >
                    <div className="fav-card-top">
                      <div className="fav-card-info">
                        <h4 className="fav-subject-title">{fav.name}</h4>
                        <div className="fav-subject-meta">
                          {fav.yearTitleAr && <span className="fav-meta-chip">{fav.yearTitleAr}</span>}
                          {isLab && <span className="fav-lab-chip">مختبر Lab</span>}
                          <span className="fav-res-chip">{resCount} مصادر</span>
                        </div>
                      </div>

                      <button
                        className="fav-remove-btn"
                        onClick={(e) => handleRemove(e, fav)}
                        title="إزالة من المفضلة"
                        type="button"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>

                    <div className="fav-card-bottom">
                      <span>فتح المادة والمصادر</span>
                      <i className="fa-solid fa-arrow-left"></i>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
