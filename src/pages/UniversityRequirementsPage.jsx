import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './UniversityRequirementsPage.css';

const REQUIREMENTS_COURSES = [
  {
    id: 1,
    title: 'قرآن كريم 1',
    icon: 'fa-solid fa-book-quran',
    filesUrl: 'https://drive.google.com/drive/folders/1fFhuXmDCBDtiUUpzBTofT1t1CMZ5pRrQ',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwYkwPgW-LrOUyyGrsNUkpkd&si=JpDPHe2lZS2XUQiN',
  },
  {
    id: 2,
    title: 'قرآن كريم 2',
    icon: 'fa-solid fa-book-quran',
    filesUrl: 'https://drive.google.com/drive/folders/1Hy6N-p9BXHFxdhcLDJ0rtAuJ_ovg2Bhw',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwYLTdGERgOVEDNAmlOhVCWK&si=ZjrTHDKcOUSqEhCE',
  },
  {
    id: 3,
    title: 'قرآن كريم 3',
    icon: 'fa-solid fa-book-quran',
    filesUrl: 'https://drive.google.com/drive/folders/1mbv0_YExiI8tmKql3maUlKp7epI3nzUs',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwZxUrBRx-jdRmTIoerOH1po&si=dTzrMPVGz2Zh1pEq',
  },
  {
    id: 4,
    title: 'قرآن كريم 4',
    icon: 'fa-solid fa-book-quran',
    filesUrl: 'https://drive.google.com/drive/folders/1l3uJD1CWQLoys53cY9ZG3Y51MhUIfODa',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwaIvb3amW8pzhbBL_vlNZyl&si=OPR11GykzUUYUfB4',
  },
  {
    id: 5,
    title: 'دراسات في العقيدة',
    icon: 'fa-solid fa-kaaba',
    filesUrl: 'https://drive.google.com/drive/folders/1wS3XM6eHAwKXR03RqXU2zgqrJ7vM2jAr',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwbjoJf68eR0YQ1OicsDn0Z_&si=yfg5lRPee3WyUXqT',
  },
  {
    id: 6,
    title: 'دراسات في الفقه',
    icon: 'fa-solid fa-scale-balanced',
    filesUrl: 'https://drive.google.com/drive/folders/1tfS2wN47_AWxqdgabUuhYYP1fW1bqWSr',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwZbdjx5qZuMNgtnza9-PqU5&si=VrKRfS4nBr4OeaeO',
  },
  {
    id: 7,
    title: 'دراسات في الحديث',
    icon: 'fa-solid fa-scroll',
    filesUrl: 'https://drive.google.com/drive/folders/1XN6Nysc9-5ImDzQUyBcmaQr0d_GXRPIo',
    lecturesUrl: 'https://youtube.com/playlist?list=PL4xB9KuJo6RS_p3XM9ObETgNjdney_lFK&si=jq8ozcUlta13vgwJ',
  },
  {
    id: 8,
    title: 'دراسات في السيرة النبوية',
    icon: 'fa-solid fa-mosque',
    filesUrl: 'https://drive.google.com/drive/folders/1IBkh8Y7fDX3s_MGo5OstS6oqh0KmM9Ah',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwZQEOmOybuIB4gZdqdI5HcQ&si=4aFH0_v2gIRu2DyC',
  },
  {
    id: 9,
    title: 'دراسات في القرآن وعلومه',
    icon: 'fa-solid fa-book-open',
    filesUrl: 'https://drive.google.com/drive/folders/1mENeCEuXEsPdWlxsEz1xKOVyR4GDetYk',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwaGIlkTCo2tGndokmJ9ZbKr&si=Vb4qt04IPVvNtvsU',
  },
  {
    id: 10,
    title: 'دراسات فلسطينية',
    icon: 'fa-solid fa-landmark',
    filesUrl: 'https://drive.google.com/drive/folders/1s0lcXE0gg7_DQ6jtbIhPjBGYYQSNMjZd',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwb0RqFErSm_cqoiTXH0hLcc&si=TBIHRU3a2CAPjP6p',
  },
  {
    id: 11,
    title: 'النظم الإسلامية',
    icon: 'fa-solid fa-sitemap',
    filesUrl: 'https://drive.google.com/drive/folders/1HHbLCF6WprxZlmyYf6lbcbj3SKPap9RO',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwYDVehtFpV9OlrzbElYsCBI&si=8G7QVOYGaLphL1Ha',
  },
  {
    id: 12,
    title: 'حاضر العالم الإسلامي',
    icon: 'fa-solid fa-globe',
    filesUrl: 'https://drive.google.com/drive/folders/1GkQb2MetwgoyIWs7NX_A_ALjglXyPPO7',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwZZ8ASUiLEKVKvwcEdfmB_y&si=IKlHNtMtbAhzhn9z',
  },
  {
    id: 13,
    title: 'نحو وصرف',
    icon: 'fa-solid fa-pen-nib',
    filesUrl: 'https://drive.google.com/drive/folders/16ol0LUfQWfPLXj9-xSmNLwkJedcqltCz',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwYhHrX4IIV26LQP7Hwav1eP&si=45Yslj4720QgYw45',
  },
  {
    id: 14,
    title: 'إسعافات أولية',
    icon: 'fa-solid fa-kit-medical',
    filesUrl: 'https://drive.google.com/drive/folders/1_WA5rIKI366AOERHzNMD686HUZCZqfuR',
    lecturesUrl: 'https://youtube.com/playlist?list=PL9fwy3NUQKwbs5iCdNevE7eKvPQcWdrWJ&si=yvRwU3i7TPngBkZ_',
  },
];

export default function UniversityRequirementsPage() {
  return (
    <div className="req-page-root" dir="rtl">
      {/* Unified Global Navbar */}
      <Navbar activePage="requirements" />

      {/* Header Banner */}
      <header className="req-header-banner">
        <div className="container req-header-content">
          <div className="tech-badge">
            <span className="dot"></span>
            <span>الجامعة الإسلامية بغزة</span>
          </div>
          <h1 className="req-title">🏛️ متطلبات الجامعة الإسلامية</h1>
          <p className="req-desc">
            تجد هنا كافة الملفات التلخيصية والمحاضرات والتسجيلات الخاصة بمساقات المتطلبات العامة الإجبارية والاختيارية لطلبة كلية الهندسة.
          </p>
        </div>
      </header>

      {/* Grid of Requirement Cards */}
      <main className="container req-main-container">
        <div className="req-cards-grid">
          {REQUIREMENTS_COURSES.map((course) => (
            <div key={course.id} className="req-item-card">
              <div className="req-item-top">
                <div className="req-item-icon">
                  <i className={course.icon}></i>
                </div>
                <h3 className="req-item-name">{course.title}</h3>
              </div>

              <div className="req-item-actions">
                <a
                  href={course.filesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="req-btn-link files-btn"
                >
                  <i className="fa-solid fa-folder-open"></i>
                  <span>الملفات والمصادر</span>
                </a>
                <a
                  href={course.lecturesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="req-btn-link lectures-btn"
                >
                  <i className="fa-solid fa-circle-play"></i>
                  <span>تسجيلات المحاضرات</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Universal Engineering Footer */}
      <Footer />
    </div>
  );
}
