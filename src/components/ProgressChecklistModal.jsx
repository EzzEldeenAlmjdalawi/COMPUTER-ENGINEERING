import React, { useState, useEffect } from 'react';
import { allSubjects, isLabCourse } from '../data/subjects';
import './ProgressChecklistModal.css';

const DEFAULT_TASKS = [
  { id: 'book', label: 'قراءة الكتاب / المرجع', icon: 'fa-solid fa-book' },
  { id: 'lectures', label: 'حضور المحاضرات المسجلة', icon: 'fa-solid fa-video' },
  { id: 'slides', label: 'مذاكرة السلايدات والشروحات', icon: 'fa-solid fa-file-powerpoint' },
  { id: 'chapters', label: 'مراجعة وتلخيص الشباتر', icon: 'fa-solid fa-file-lines' },
  { id: 'problems', label: 'حل المسائل والمناقشات', icon: 'fa-solid fa-pen-ruler' },
  { id: 'exams', label: 'مراجعة الكويزات والامتحانات السابقة', icon: 'fa-solid fa-graduation-cap' },
];

const LAB_TASKS = [
  { id: 'lab_manual', label: 'مراجعة دليل وتجارب المعمل', icon: 'fa-solid fa-flask' },
  { id: 'lab_videos', label: 'مشاهدة تسجيلات وشروحات اللاب', icon: 'fa-solid fa-circle-play' },
  { id: 'lab_reports', label: 'تسليم تقارير المعمل والواجبات', icon: 'fa-solid fa-file-circle-check' },
  { id: 'lab_exams', label: 'الاستعداد لامتحان العملي / النهائي', icon: 'fa-solid fa-vial-circle-check' },
];

export const getStudyProgress = () => {
  try {
    const raw = localStorage.getItem('ce_study_checklist');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const setSubjectTaskProgress = (subjectName, taskId, isCompleted) => {
  try {
    const current = getStudyProgress();
    const subObj = current[subjectName] || {};
    subObj[taskId] = isCompleted;
    current[subjectName] = subObj;
    localStorage.setItem('ce_study_checklist', JSON.stringify(current));
    window.dispatchEvent(new Event('ce_progress_updated'));
  } catch (e) {
    console.error(e);
  }
};

export default function ProgressChecklistModal({ isOpen, onClose, initialSubject = null }) {
  const [progressData, setProgressData] = useState({});
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSubjectName, setSelectedSubjectName] = useState(initialSubject || '');

  const refresh = () => setProgressData(getStudyProgress());

  useEffect(() => {
    refresh();
    window.addEventListener('ce_progress_updated', refresh);
    return () => window.removeEventListener('ce_progress_updated', refresh);
  }, []);

  useEffect(() => {
    if (initialSubject) {
      setSelectedSubjectName(initialSubject);
    } else if (allSubjects.length > 0 && !selectedSubjectName) {
      setSelectedSubjectName(allSubjects[0].name);
    }
  }, [initialSubject]);

  if (!isOpen) return null;

  const currentSubjectObj = allSubjects.find((s) => s.name === selectedSubjectName) || allSubjects[0];
  const isLab = isLabCourse(currentSubjectObj?.name);
  const taskList = isLab ? LAB_TASKS : DEFAULT_TASKS;

  const subCompleted = progressData[currentSubjectObj?.name] || {};
  const completedCount = taskList.filter((t) => subCompleted[t.id]).length;
  const percent = Math.round((completedCount / taskList.length) * 100);

  const toggleTask = (taskId) => {
    const nextVal = !subCompleted[taskId];
    setSubjectTaskProgress(currentSubjectObj.name, taskId, nextVal);
  };

  const filteredSubjects = selectedYear === 'all'
    ? allSubjects
    : allSubjects.filter((s) => s.year === selectedYear);

  return (
    <div className="progress-modal-backdrop animate-fade-in" onClick={onClose} dir="rtl">
      <div className="progress-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="progress-modal-header">
          <div className="progress-header-title">
            <i className="fa-solid fa-list-check progress-title-icon"></i>
            <div>
              <h3>متابع الإنجاز الدراسي</h3>
              <span>سجل إنجازك لكل مادة واحفظ تقدمك محلياً</span>
            </div>
          </div>
          <button className="progress-close-btn" onClick={onClose} aria-label="إغلاق">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Layout: Sidebar Subject Picker + Main Checklist */}
        <div className="progress-modal-body">
          {/* Left / Right Selectors */}
          <div className="progress-sidebar">
            <div className="progress-filter-group">
              <label>اختر السنة:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="progress-select"
              >
                <option value="all">جميع السنوات</option>
                <option value="firstYear">السنة الأولى</option>
                <option value="secndYear">السنة الثانية</option>
                <option value="thirdYear">السنة الثالثة</option>
                <option value="fourthYear">السنة الرابعة</option>
                <option value="fifthYear">السنة الخامسة</option>
              </select>
            </div>

            <div className="progress-subjects-list">
              {filteredSubjects.map((sub) => {
                const sLab = isLabCourse(sub.name);
                const sTasks = sLab ? LAB_TASKS : DEFAULT_TASKS;
                const sDone = (progressData[sub.name] && Object.values(progressData[sub.name]).filter(Boolean).length) || 0;
                const sPercent = Math.round((sDone / sTasks.length) * 100);

                return (
                  <div
                    key={sub.name}
                    className={`progress-sub-item ${selectedSubjectName === sub.name ? 'active' : ''}`}
                    onClick={() => setSelectedSubjectName(sub.name)}
                  >
                    <div className="progress-sub-info">
                      <span className="progress-sub-name">{sub.name}</span>
                      <span className="progress-sub-year">{sub.yearTitleAr}</span>
                    </div>
                    <span className="progress-mini-badge">{sPercent}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Checklist Card */}
          <div className="progress-checklist-content">
            <div className="progress-active-header">
              <div>
                <h4 className="progress-active-title">{currentSubjectObj?.name}</h4>
                <span className="progress-active-meta">
                  {currentSubjectObj?.yearTitleAr} • {currentSubjectObj?.semesterTitleAr}
                  {isLab && <span className="lab-chip-sm">مختبر Lab</span>}
                </span>
              </div>
              <div className="progress-stat-pill">
                <strong>{completedCount}/{taskList.length}</strong> مكتمل ({percent}%)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
            </div>

            {/* Checklist items */}
            <div className="progress-tasks-list">
              {taskList.map((task) => {
                const isChecked = !!subCompleted[task.id];
                return (
                  <label key={task.id} className={`progress-task-row ${isChecked ? 'is-checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-icon-box">
                      <i className={task.icon}></i>
                    </div>
                    <span className="task-label-text">{task.label}</span>
                    {isChecked && <i className="fa-solid fa-check task-done-icon"></i>}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
