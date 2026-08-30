import React from 'react';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="engineering-footer" dir="rtl">
      <div className="container footer-grid">
        {/* Brand & Mission */}
        <div className="footer-col brand-col">
          <div className="footer-brand-header">
            <Logo size={42} />
            <div>
              <h3 className="footer-brand-title">COMPUTER ENGINEERING</h3>
              <span className="footer-brand-sub">IUG • الجامعة الإسلامية بغزة</span>
            </div>
          </div>
          <p className="footer-mission-text">
            المنصة التعليمية الأولى لطلبة هندسة الحاسوب، توفر شروحات، ملفات دراسية، سلايدات، امتحانات سابقة، وأدوات دراسية ذكية لكافة المستويات الأكاديمية.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col links-col">
          <h4 className="footer-col-heading">
            <i className="fa-solid fa-compass"></i>
            <span>روابط المنصة</span>
          </h4>
          <ul className="footer-links-list">
            <li><a href="index.html"><i className="fa-solid fa-house"></i> الرئيسية</a></li>
            <li><a href="firstYear.html"><i className="fa-solid fa-cubes"></i> السنة الأولى</a></li>
            <li><a href="secndYear.html"><i className="fa-solid fa-microchip"></i> السنة الثانية</a></li>
            <li><a href="thirdYear.html"><i className="fa-solid fa-network-wired"></i> السنة الثالثة</a></li>
            <li><a href="fourthYear.html"><i className="fa-solid fa-laptop-code"></i> السنة الرابعة</a></li>
            <li><a href="fifthYear.html"><i className="fa-solid fa-award"></i> السنة الخامسة</a></li>
            <li><a href="university-requirements.html"><i className="fa-solid fa-graduation-cap"></i> متطلبات الجامعة</a></li>
            <li><a href="study-tools.html"><i className="fa-solid fa-brain"></i> أدوات الدراسة</a></li>
            <li><a href="gpa-calculator.html"><i className="fa-solid fa-calculator"></i> حاسبة المعدل الجامعي</a></li>
          </ul>
        </div>

        {/* Contact Info & Telegram */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-heading">
            <i className="fa-solid fa-headset"></i>
            <span>التواصل والدعم الفني</span>
          </h4>
          <div className="contact-items-list">
            <a href="tel:0595346617" className="contact-link-item">
              <div className="contact-icon-box phone">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="contact-text-box">
                <span className="contact-label">الهاتف / واتساب:</span>
                <strong className="contact-value" dir="ltr">0595346617</strong>
              </div>
            </a>

            <a
              href="mailto:mnmaassddll@gmail.com"
              className="contact-link-item email-action-item"
              title="إرسال بريد إلكتروني مباشر (راسلني)"
            >
              <div className="contact-icon-box email">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="contact-text-box">
                <span className="contact-label">البريد الإلكتروني:</span>
                <span className="contact-action-badge">
                  <span>راسلني عبر الإيميل</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </span>
              </div>
            </a>

            <div className="footer-social-buttons">
              <a
                href="https://t.me/+lUyeZmUh7KpjM2Fi"
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn tg"
                title="قناة التليجرام"
              >
                <i className="fa-brands fa-telegram"></i>
                <span>قناة التليجرام</span>
              </a>
              <a
                href="http://t.me/iug_computer_Enfuneering_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn bot"
                title="بوت الملفات"
              >
                <i className="fa-solid fa-robot"></i>
                <span>بوت الملفات</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Credits */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <div className="footer-devs">
            <span>إعداد وتطوير:</span>
            <strong>Eng. Ezz Eldeen Bassam Almjdalawi</strong>
            <span className="amp">&</span>
            <strong>Eng. Musab Musa Alaswed</strong>
          </div>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} قسم هندسة الحاسوب — الجامعة الإسلامية بغزة. جميع الحقوق محفوظة.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
