import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GPA_PLAN_SEMESTERS, TOTAL_PLAN_HOURS, getGpaEvaluation } from '../data/gpaPlanData';
import './GpaCalculatorPage.css';

export default function GpaCalculatorPage() {
  const [activeTab, setActiveTab] = useState('fullPlan'); // 'fullPlan' | 'whatIf' | 'classwork'

  // --- 1. Mode A: Full Plan State ---
  const [grades, setGrades] = useState(() => {
    try {
      const saved = localStorage.getItem('ce_gpa_plan_grades');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [expandedSemesters, setExpandedSemesters] = useState(() => {
    const initial = {};
    GPA_PLAN_SEMESTERS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('ce_gpa_plan_grades', JSON.stringify(grades));
  }, [grades]);

  const handleGradeChange = (courseId, val) => {
    if (val === '') {
      const updated = { ...grades };
      delete updated[courseId];
      setGrades(updated);
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setGrades({ ...grades, [courseId]: num });
    }
  };

  const handleResetFullPlan = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في مسح كافة العلامات المدخلة في الخطة الشاملة؟')) {
      setGrades({});
      localStorage.removeItem('ce_gpa_plan_grades');
    }
  };

  const handleFillSemester = (sem) => {
    const promptVal = window.prompt(`أدخل العلامة (0-100) لملء كافة مساقات ${sem.yearTitle} - ${sem.semesterTitle}:`, '85');
    if (promptVal !== null) {
      const num = parseFloat(promptVal);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        const nextGrades = { ...grades };
        sem.courses.forEach((c) => {
          nextGrades[c.id] = num;
        });
        setGrades(nextGrades);
      }
    }
  };

  // Calculations for Mode A
  const fullPlanStats = useMemo(() => {
    let totalPoints = 0;
    let totalHours = 0;
    let totalEnteredCourses = 0;

    const semResults = {};

    GPA_PLAN_SEMESTERS.forEach((sem) => {
      let semPoints = 0;
      let semHours = 0;
      let semEntered = 0;

      sem.courses.forEach((c) => {
        const g = grades[c.id];
        if (g !== undefined && g !== null && g !== '') {
          const pts = g * c.hours;
          semPoints += pts;
          semHours += c.hours;
          semEntered += 1;
        }
      });

      const semGpa = semHours > 0 ? (semPoints / semHours) : null;
      semResults[sem.id] = {
        points: semPoints,
        hours: semHours,
        enteredCount: semEntered,
        gpa: semGpa,
      };

      totalPoints += semPoints;
      totalHours += semHours;
      totalEnteredCourses += semEntered;
    });

    const cumGpa = totalHours > 0 ? (totalPoints / totalHours) : null;

    return {
      totalPoints,
      totalHours,
      totalEnteredCourses,
      cumGpa,
      semResults,
    };
  }, [grades]);

  // --- 2. Mode B: What-If Next Semester State ---
  const [prevHoursInput, setPrevHoursInput] = useState('');
  const [prevGpaInput, setPrevGpaInput] = useState('');

  const [hypoCourses, setHypoCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('ce_gpa_whatif_courses');
      return saved ? JSON.parse(saved) : [
        { id: 'h1', name: 'مساق 1', grade: 85, hours: 3 },
        { id: 'h2', name: 'مساق 2', grade: 80, hours: 4 },
        { id: 'h3', name: 'مساق 3', grade: 90, hours: 3 },
      ];
    } catch (e) {
      return [
        { id: 'h1', name: 'مساق 1', grade: 85, hours: 3 },
        { id: 'h2', name: 'مساق 2', grade: 80, hours: 4 },
        { id: 'h3', name: 'مساق 3', grade: 90, hours: 3 },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem('ce_gpa_whatif_courses', JSON.stringify(hypoCourses));
  }, [hypoCourses]);

  const useActualPlanTotals = () => {
    if (fullPlanStats.totalHours > 0 && fullPlanStats.cumGpa !== null) {
      setPrevHoursInput(String(fullPlanStats.totalHours));
      setPrevGpaInput(fullPlanStats.cumGpa.toFixed(2));
    } else {
      alert('لم تقم بإدخال أي علامات في حاسبة الخطة الشاملة بعد! يمكنك إدخال الساعات والمعدل السابق يدوياً.');
    }
  };

  const handleAddHypoCourse = () => {
    setHypoCourses([
      ...hypoCourses,
      { id: 'h_' + Date.now(), name: `مساق ${hypoCourses.length + 1}`, grade: 80, hours: 3 },
    ]);
  };

  const handleRemoveHypoCourse = (id) => {
    setHypoCourses(hypoCourses.filter((c) => c.id !== id));
  };

  const handleUpdateHypoCourse = (id, field, value) => {
    setHypoCourses(
      hypoCourses.map((c) => {
        if (c.id === id) {
          if (field === 'grade' || field === 'hours') {
            return { ...c, [field]: value === '' ? '' : parseFloat(value) || 0 };
          }
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const whatIfStats = useMemo(() => {
    let semHours = 0;
    let semPoints = 0;

    hypoCourses.forEach((c) => {
      const g = parseFloat(c.grade) || 0;
      const h = parseFloat(c.hours) || 0;
      semHours += h;
      semPoints += g * h;
    });

    const semGpa = semHours > 0 ? (semPoints / semHours) : null;

    const prevH = parseFloat(prevHoursInput) || (fullPlanStats.totalHours > 0 ? fullPlanStats.totalHours : 0);
    const prevG = parseFloat(prevGpaInput) || (fullPlanStats.cumGpa !== null ? fullPlanStats.cumGpa : 0);
    const prevPoints = prevH * prevG;

    const newTotalHours = prevH + semHours;
    const newTotalPoints = prevPoints + semPoints;
    const newCumGpa = newTotalHours > 0 ? (newTotalPoints / newTotalHours) : null;
    const diff = (newCumGpa !== null && prevG > 0) ? (newCumGpa - prevG) : null;

    return {
      semHours,
      semPoints,
      semGpa,
      prevH,
      prevG,
      newTotalHours,
      newCumGpa,
      diff,
    };
  }, [hypoCourses, prevHoursInput, prevGpaInput, fullPlanStats]);

  // --- 3. Mode C: Classwork Converter State ---
  const [cwList, setCwList] = useState([
    { id: 'cw1', name: 'دوائر عملي', score: 38, maxScore: 40, hours: 1 },
    { id: 'cw2', name: 'دسكريت', score: 45, maxScore: 50, hours: 4 },
    { id: 'cw3', name: 'هياكل بيانات', score: 52, maxScore: 60, hours: 4 },
  ]);

  const handleAddCwCourse = () => {
    setCwList([
      ...cwList,
      { id: 'cw_' + Date.now(), name: `مساق جديد ${cwList.length + 1}`, score: 40, maxScore: 50, hours: 3 },
    ]);
  };

  const handleRemoveCwCourse = (id) => {
    setCwList(cwList.filter((c) => c.id !== id));
  };

  const handleUpdateCwCourse = (id, field, value) => {
    setCwList(
      cwList.map((c) => {
        if (c.id === id) {
          if (field === 'score' || field === 'maxScore' || field === 'hours') {
            return { ...c, [field]: value === '' ? '' : parseFloat(value) || 0 };
          }
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const classworkStats = useMemo(() => {
    let totalCwHours = 0;
    let totalWeightedPoints = 0;

    const items = cwList.map((c) => {
      const score = parseFloat(c.score) || 0;
      const maxScore = parseFloat(c.maxScore) || 1;
      const hours = parseFloat(c.hours) || 0;

      const equivGrade = maxScore > 0 ? (score / maxScore) * 100 : 0;
      const weightedPts = equivGrade * hours;

      totalCwHours += hours;
      totalWeightedPoints += weightedPts;

      return {
        ...c,
        equivGrade,
        weightedPts,
      };
    });

    const semesterEquivalentGpa = totalCwHours > 0 ? (totalWeightedPoints / totalCwHours) : null;

    return {
      items,
      totalCwHours,
      totalWeightedPoints,
      semesterEquivalentGpa,
    };
  }, [cwList]);

  const sendClassworkToWhatIf = () => {
    const converted = classworkStats.items.map((item) => ({
      id: 'h_from_cw_' + item.id + '_' + Date.now(),
      name: item.name,
      grade: Math.round(item.equivGrade * 10) / 10,
      hours: item.hours,
    }));
    setHypoCourses(converted);
    setActiveTab('whatIf');
  };

  const evaluation = fullPlanStats.cumGpa !== null ? getGpaEvaluation(fullPlanStats.cumGpa) : null;
  const whatIfEval = whatIfStats.newCumGpa !== null ? getGpaEvaluation(whatIfStats.newCumGpa) : null;

  return (
    <div className="gpa-calc-root" dir="rtl">
      <Navbar activePage="gpa" />

      {/* Hero Header */}
      <header className="gpa-hero-header">
        <div className="container">
          <div className="gpa-hero-badge">
            <i className="fa-solid fa-calculator"></i>
            <span>الجامعة الإسلامية بغزة • هندسة الحاسوب</span>
          </div>
          <h1 className="gpa-hero-title">حاسبة المعدل الجامعي (0–100)</h1>
          <p className="gpa-hero-desc">
            احسب معدلك التراكمي والفصلي بدقة متناهية وفق الخطة الأكاديمية الرسمية (167 ساعة)، وتوقع معدل الفصول القادمة ومحول درجات الأعمال الفصلية.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="gpa-mode-tabs">
            <button
              type="button"
              className={`gpa-tab-btn ${activeTab === 'fullPlan' ? 'active' : ''}`}
              onClick={() => setActiveTab('fullPlan')}
            >
              <i className="fa-solid fa-table-list"></i>
              <span>حاسبة الخطة الشاملة (10 فصول)</span>
            </button>
            <button
              type="button"
              className={`gpa-tab-btn ${activeTab === 'whatIf' ? 'active' : ''}`}
              onClick={() => setActiveTab('whatIf')}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>توقع معدل الفصل القادم (What-If)</span>
            </button>
            <button
              type="button"
              className={`gpa-tab-btn ${activeTab === 'classwork' ? 'active' : ''}`}
              onClick={() => setActiveTab('classwork')}
            >
              <i className="fa-solid fa-percent"></i>
              <span>محول أعمال الفصل (من 100)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="gpa-main-content container">
        {/* ==================================================== */}
        {/* TAB 1: FULL PLAN CALCULATOR */}
        {/* ==================================================== */}
        {activeTab === 'fullPlan' && (
          <div className="tab-pane animate-fade-in">
            {/* Sticky Cumulative Stats Card */}
            <div className="gpa-summary-card">
              <div className="summary-col gpa-val-col">
                <span className="sum-label">المعدل التراكمي العام:</span>
                <div className="sum-big-number">
                  {fullPlanStats.cumGpa !== null ? fullPlanStats.cumGpa.toFixed(2) : '--.--'}
                  <span className="percent-sign">%</span>
                </div>
                {evaluation && (
                  <span className="eval-badge" style={{ color: evaluation.color, backgroundColor: evaluation.bg }}>
                    {evaluation.label}
                  </span>
                )}
              </div>

              <div className="summary-col hours-col">
                <span className="sum-label">الساعات المنجزة:</span>
                <div className="hours-val">
                  <strong>{fullPlanStats.totalHours}</strong> / {TOTAL_PLAN_HOURS} ساعة
                </div>
                <div className="hours-progress-track">
                  <div
                    className="hours-progress-fill"
                    style={{ width: `${Math.min(100, (fullPlanStats.totalHours / TOTAL_PLAN_HOURS) * 100)}%` }}
                  ></div>
                </div>
                <span className="hours-percent-text">
                  نسبة إنهاء الخطة: {((fullPlanStats.totalHours / TOTAL_PLAN_HOURS) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="summary-col points-col">
                <span className="sum-label">مجموع النقاط الموزونة:</span>
                <div className="points-val">
                  {fullPlanStats.totalPoints.toFixed(1)}
                </div>
                <span className="courses-count-text">
                  ({fullPlanStats.totalEnteredCourses}) مساقات تم إدخال علاماتها
                </span>
              </div>

              <div className="summary-col actions-col">
                <button
                  type="button"
                  className="gpa-btn-outline reset"
                  onClick={handleResetFullPlan}
                  title="مسح كافة العلامات"
                >
                  <i className="fa-solid fa-rotate-right"></i>
                  <span>إعادة تعيين</span>
                </button>
                <button
                  type="button"
                  className="gpa-btn-solid"
                  onClick={() => window.print()}
                  title="طباعة كشف العلامات"
                >
                  <i className="fa-solid fa-print"></i>
                  <span>طباعة الكشف</span>
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="gpa-instructions-note">
              <i className="fa-solid fa-circle-info"></i>
              <span>
                أدخل علاماتك من (0–100) للمساقات التي أنهيتها فقط. المساقات غير المنجزة اتركها فارغة وسيتم حساب معدلك تلقائياً.
              </span>
            </div>

            {/* Semesters Grid */}
            <div className="plan-semesters-list">
              {GPA_PLAN_SEMESTERS.map((sem, idx) => {
                const semData = fullPlanStats.semResults[sem.id] || { hours: 0, points: 0, gpa: null, enteredCount: 0 };
                const isOpen = expandedSemesters[sem.id];
                const isFull = semData.enteredCount === sem.courses.length;

                return (
                  <div key={sem.id} className="sem-calc-box">
                    {/* Header */}
                    <div
                      className="sem-calc-header"
                      onClick={() => setExpandedSemesters({ ...expandedSemesters, [sem.id]: !isOpen })}
                    >
                      <div className="sem-header-left">
                        <span className="sem-num-badge">فصل {idx + 1}</span>
                        <div>
                          <h3 className="sem-box-title">{sem.yearTitle} • {sem.semesterTitle}</h3>
                          <span className="sem-box-sub">
                            {sem.courses.length} مساقات ({sem.totalHours} ساعة معتمدة)
                          </span>
                        </div>
                      </div>

                      <div className="sem-header-right" onClick={(e) => e.stopPropagation()}>
                        {semData.gpa !== null && (
                          <div className="sem-live-gpa">
                            <span>معدل الفصل:</span>
                            <strong>{semData.gpa.toFixed(2)}%</strong>
                          </div>
                        )}
                        <button
                          type="button"
                          className="sem-fill-btn"
                          onClick={() => handleFillSemester(sem)}
                          title="ملء علامات هذا الفصل بعلامة موحدة"
                        >
                          <i className="fa-solid fa-wand-magic"></i>
                          <span>ملء سريع</span>
                        </button>
                        <i className={`fa-solid fa-chevron-down sem-toggle-arrow ${isOpen ? 'rotate' : ''}`}></i>
                      </div>
                    </div>

                    {/* Courses Table */}
                    {isOpen && (
                      <div className="sem-calc-body animate-fade-in">
                        <table className="courses-table">
                          <thead>
                            <tr>
                              <th>اسم المساق</th>
                              <th style={{ width: '100px', textAlign: 'center' }}>الساعات</th>
                              <th style={{ width: '140px', textAlign: 'center' }}>العلامة (0-100)</th>
                              <th style={{ width: '130px', textAlign: 'center' }}>النقاط الموزونة</th>
                              <th style={{ width: '160px', textAlign: 'center' }}>خيارات سريعة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sem.courses.map((course) => {
                              const g = grades[course.id];
                              const hasGrade = g !== undefined && g !== null && g !== '';
                              const weighted = hasGrade ? (g * course.hours).toFixed(1) : '-';

                              return (
                                <tr key={course.id} className={hasGrade ? 'row-graded' : ''}>
                                  <td className="course-name-cell">
                                    <span className="course-title">{course.name}</span>
                                  </td>
                                  <td className="course-hours-cell">
                                    <span className="hours-chip">{course.hours} ساعة</span>
                                  </td>
                                  <td className="course-input-cell">
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="0.5"
                                      placeholder="0–100"
                                      value={g !== undefined ? g : ''}
                                      onChange={(e) => handleGradeChange(course.id, e.target.value)}
                                      className="grade-input"
                                    />
                                  </td>
                                  <td className="course-weighted-cell">
                                    <span className="weighted-value">{weighted}</span>
                                  </td>
                                  <td className="course-quick-actions">
                                    <div className="quick-btn-group">
                                      <button type="button" onClick={() => handleGradeChange(course.id, 90)}>90</button>
                                      <button type="button" onClick={() => handleGradeChange(course.id, 85)}>85</button>
                                      <button type="button" onClick={() => handleGradeChange(course.id, 75)}>75</button>
                                      {hasGrade && (
                                        <button type="button" className="clear-btn" onClick={() => handleGradeChange(course.id, '')}>
                                          <i className="fa-solid fa-xmark"></i>
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: WHAT-IF NEXT SEMESTER CALCULATOR */}
        {/* ==================================================== */}
        {activeTab === 'whatIf' && (
          <div className="tab-pane animate-fade-in">
            {/* Projected Result Banner */}
            <div className="whatif-result-banner">
              <div className="whatif-res-col">
                <span className="w-label">معدل الفصل المتوقع:</span>
                <div className="w-number text-amber">
                  {whatIfStats.semGpa !== null ? whatIfStats.semGpa.toFixed(2) : '--.--'}%
                </div>
                <span className="w-sub">({whatIfStats.semHours} ساعة متوقعة)</span>
              </div>

              <div className="whatif-arrow">
                <i className="fa-solid fa-arrow-left"></i>
              </div>

              <div className="whatif-res-col">
                <span className="w-label">المعدل التراكمي الجديد:</span>
                <div className="w-number text-emerald">
                  {whatIfStats.newCumGpa !== null ? whatIfStats.newCumGpa.toFixed(2) : '--.--'}%
                </div>
                {whatIfStats.diff !== null && (
                  <span className={`w-diff-badge ${whatIfStats.diff >= 0 ? 'diff-up' : 'diff-down'}`}>
                    {whatIfStats.diff >= 0 ? `+${whatIfStats.diff.toFixed(2)}%` : `${whatIfStats.diff.toFixed(2)}%`}
                    {whatIfStats.diff >= 0 ? ' 📈 ارتفاع' : ' 📉 انخفاض'}
                  </span>
                )}
              </div>
            </div>

            {/* Previous Totals Input Box */}
            <div className="whatif-prev-box">
              <div className="prev-box-header">
                <div>
                  <h4>1. رصيد الساعات والمعدل السابق</h4>
                  <p>أدخل معدلك الحالي وساعاتك السابقة، أو اسحبها بضغطة زر واحدة من الخطة الشاملة</p>
                </div>
                <button
                  type="button"
                  className="sync-from-plan-btn"
                  onClick={useActualPlanTotals}
                >
                  <i className="fa-solid fa-arrows-rotate"></i>
                  <span>سحب التراكمي من الخطة الشاملة</span>
                </button>
              </div>

              <div className="prev-inputs-grid">
                <div className="input-field-group">
                  <label>مجموع الساعات السابقة المنجزة:</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="مثال: 60"
                    value={prevHoursInput}
                    onChange={(e) => setPrevHoursInput(e.target.value)}
                    className="prev-input"
                  />
                </div>
                <div className="input-field-group">
                  <label>المعدل التراكمي السابق (0-100):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="مثال: 82.5"
                    value={prevGpaInput}
                    onChange={(e) => setPrevGpaInput(e.target.value)}
                    className="prev-input"
                  />
                </div>
              </div>
            </div>

            {/* Hypothetical Courses Table */}
            <div className="whatif-courses-box">
              <div className="whatif-courses-header">
                <div>
                  <h4>2. مساقات الفصل القادم المتوقعة</h4>
                  <p>أضف المساقات التي تنوي تسجيلها والعلامة المتوقعة لكل منها</p>
                </div>
                <button
                  type="button"
                  className="gpa-btn-solid add-course"
                  onClick={handleAddHypoCourse}
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>إضافة مساق</span>
                </button>
              </div>

              <div className="hypo-table-wrapper">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>اسم المساق</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>عدد الساعات</th>
                      <th style={{ width: '160px', textAlign: 'center' }}>العلامة المتوقعة (0-100)</th>
                      <th style={{ width: '140px', textAlign: 'center' }}>النقاط الموزونة</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hypoCourses.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <input
                            type="text"
                            value={c.name}
                            onChange={(e) => handleUpdateHypoCourse(c.id, 'name', e.target.value)}
                            className="hypo-name-input"
                            placeholder="اسم المساق"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="number"
                            min="1"
                            max="6"
                            value={c.hours}
                            onChange={(e) => handleUpdateHypoCourse(c.id, 'hours', e.target.value)}
                            className="grade-input"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={c.grade}
                            onChange={(e) => handleUpdateHypoCourse(c.id, 'grade', e.target.value)}
                            className="grade-input"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="weighted-value">{((c.grade || 0) * (c.hours || 0)).toFixed(1)}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="delete-row-btn"
                            onClick={() => handleRemoveHypoCourse(c.id)}
                            title="حذف المساق"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CLASSWORK-TO-GRADE CONVERTER */}
        {/* ==================================================== */}
        {activeTab === 'classwork' && (
          <div className="tab-pane animate-fade-in">
            {/* Explanatory Banner */}
            <div className="cw-summary-banner">
              <div className="cw-banner-info">
                <span className="cw-badge">جدول أعمال الفصل</span>
                <h3>محول درجات أعمال الفصل والامتحانات النصفية إلى 100</h3>
                <p>
                  إذا كنت تعرف فقط درجة أعمال الفصل (مثال: 36 من 40 أو 45 من 50)، يقوم هذا المحول بحساب الدرجة المكافئة من 100 والنقاط الموزونة وتمريرها مباشرة لحاسبة الفصل القادم.
                </p>
              </div>

              <div className="cw-banner-stat">
                <span>المعدل الفصلي المكافئ لأعمال الفصل:</span>
                <div className="cw-big-stat">
                  {classworkStats.semesterEquivalentGpa !== null
                    ? `${classworkStats.semesterEquivalentGpa.toFixed(2)}%`
                    : '--.--%'}
                </div>
                <button
                  type="button"
                  className="feed-to-whatif-btn"
                  onClick={sendClassworkToWhatIf}
                >
                  <i className="fa-solid fa-share-from-square"></i>
                  <span>ترحيل إلى حاسبة الفصل المتوقع</span>
                </button>
              </div>
            </div>

            {/* Classwork Table */}
            <div className="cw-table-card">
              <div className="cw-table-header">
                <div>
                  <h4>قائمة مساقات الأعمال الفصلية</h4>
                  <p>أدخل علامتك التي حصلت عليها والنهاية العظمى المخصصة لأعمال الفصل</p>
                </div>
                <button
                  type="button"
                  className="gpa-btn-solid"
                  onClick={handleAddCwCourse}
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>إضافة مساق جديد</span>
                </button>
              </div>

              <div className="cw-table-wrapper">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>اسم المساق</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>درجة الأعمال المحصلة</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>النهاية العظمى للأعمال</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>عدد الساعات</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>الدرجة المكافئة من 100</th>
                      <th style={{ width: '120px', textAlign: 'center' }}>النقاط الموزونة</th>
                      <th style={{ width: '70px', textAlign: 'center' }}>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classworkStats.items.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <input
                            type="text"
                            value={c.name}
                            onChange={(e) => handleUpdateCwCourse(c.id, 'name', e.target.value)}
                            className="hypo-name-input"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="number"
                            min="0"
                            max={c.maxScore}
                            value={c.score}
                            onChange={(e) => handleUpdateCwCourse(c.id, 'score', e.target.value)}
                            className="grade-input"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={c.maxScore}
                            onChange={(e) => handleUpdateCwCourse(c.id, 'maxScore', e.target.value)}
                            className="grade-input"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="number"
                            min="1"
                            max="6"
                            value={c.hours}
                            onChange={(e) => handleUpdateCwCourse(c.id, 'hours', e.target.value)}
                            className="grade-input"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="equiv-grade-chip">{c.equivGrade.toFixed(1)}%</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="weighted-value">{c.weightedPts.toFixed(1)}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="delete-row-btn"
                            onClick={() => handleRemoveCwCourse(c.id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
