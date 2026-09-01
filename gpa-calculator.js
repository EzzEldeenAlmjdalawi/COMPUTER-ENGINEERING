/**
 * GPA CALCULATOR CONTROLLER (VANILLA JS)
 * Official 0-100 Grading Scale for IUG Computer Engineering (167 Credit Hours)
 * Modes: Full Plan (A), What-If Next Semester (B), Classwork Converter (C)
 */

(function () {
  'use strict';

  let activeTab = 'fullPlan';
  let grades = {};
  let hypoCourses = [
    { id: 'h1', name: 'مساق 1', grade: 85, hours: 3 },
    { id: 'h2', name: 'مساق 2', grade: 80, hours: 4 },
    { id: 'h3', name: 'مساق 3', grade: 90, hours: 3 },
  ];
  let cwList = [
    { id: 'cw1', name: 'دوائر عملي', score: 38, maxScore: 40, hours: 1 },
    { id: 'cw2', name: 'دسكريت', score: 45, maxScore: 50, hours: 4 },
    { id: 'cw3', name: 'هياكل بيانات', score: 52, maxScore: 60, hours: 4 },
  ];

  function loadSavedData() {
    try {
      const savedG = localStorage.getItem('ce_gpa_plan_grades');
      if (savedG) grades = JSON.parse(savedG);
      const savedH = localStorage.getItem('ce_gpa_whatif_courses');
      if (savedH) hypoCourses = JSON.parse(savedH);
    } catch (e) {}
  }

  function saveGrades() {
    localStorage.setItem('ce_gpa_plan_grades', JSON.stringify(grades));
  }

  function saveHypo() {
    localStorage.setItem('ce_gpa_whatif_courses', JSON.stringify(hypoCourses));
  }

  // ==========================================
  // TAB SWITCHING
  // ==========================================
  window.switchGpaTab = function (tabName) {
    activeTab = tabName;
    document.querySelectorAll('.gpa-tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.gpa-tab-pane').forEach((pane) => {
      pane.style.display = pane.id === `tab-${tabName}` ? 'block' : 'none';
    });

    if (tabName === 'fullPlan') renderFullPlan();
    else if (tabName === 'whatIf') renderWhatIf();
    else if (tabName === 'classwork') renderClasswork();
  };

  // ==========================================
  // MODE A: FULL PLAN LOGIC & RENDERING
  // ==========================================
  window.onGradeInput = function (courseId, value) {
    if (value === '') {
      delete grades[courseId];
    } else {
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        grades[courseId] = num;
      }
    }
    saveGrades();
    updateFullPlanCalculations();
  };

  window.setQuickGrade = function (courseId, val) {
    const input = document.getElementById(`input_${courseId}`);
    if (input) {
      input.value = val;
      window.onGradeInput(courseId, val);
    }
  };

  window.clearGrade = function (courseId) {
    window.setQuickGrade(courseId, '');
  };

  window.fillSemesterGrades = function (semId, semTitle) {
    const val = prompt(`أدخل العلامة (0-100) لملء كافة مساقات ${semTitle}:`, '85');
    if (val !== null) {
      const num = parseFloat(val);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        const sems = (window.CE_GPA_DATA && window.CE_GPA_DATA.GPA_PLAN_SEMESTERS) || [];
        const sem = sems.find((s) => s.id === semId);
        if (sem) {
          sem.courses.forEach((c) => {
            grades[c.id] = num;
            const input = document.getElementById(`input_${c.id}`);
            if (input) input.value = num;
          });
          saveGrades();
          updateFullPlanCalculations();
        }
      }
    }
  };

  window.resetFullPlan = function () {
    if (confirm('هل أنت متأكد من رغبتك في مسح كافة العلامات المدخلة في الخطة الشاملة؟')) {
      grades = {};
      localStorage.removeItem('ce_gpa_plan_grades');
      renderFullPlan();
    }
  };

  function updateFullPlanCalculations() {
    const sems = (window.CE_GPA_DATA && window.CE_GPA_DATA.GPA_PLAN_SEMESTERS) || [];
    let totalPoints = 0;
    let totalHours = 0;
    let totalEntered = 0;

    sems.forEach((sem) => {
      let semPoints = 0;
      let semHours = 0;

      sem.courses.forEach((c) => {
        const g = grades[c.id];
        const weightedEl = document.getElementById(`weighted_${c.id}`);
        if (g !== undefined && g !== null && g !== '') {
          const pts = g * c.hours;
          semPoints += pts;
          semHours += c.hours;
          totalEntered++;
          if (weightedEl) weightedEl.textContent = pts.toFixed(1);
        } else {
          if (weightedEl) weightedEl.textContent = '-';
        }
      });

      const semGpaEl = document.getElementById(`sem_gpa_${sem.id}`);
      if (semGpaEl) {
        if (semHours > 0) {
          const semGpa = (semPoints / semHours).toFixed(2);
          semGpaEl.innerHTML = `<span>معدل الفصل:</span> <strong>${semGpa}%</strong>`;
        } else {
          semGpaEl.innerHTML = '';
        }
      }

      totalPoints += semPoints;
      totalHours += semHours;
    });

    const cumGpa = totalHours > 0 ? (totalPoints / totalHours) : null;
    const cumGpaEl = document.getElementById('sumCumGpaDisplay');
    const evalEl = document.getElementById('sumEvalBadge');
    const hoursEl = document.getElementById('sumHoursDisplay');
    const progressEl = document.getElementById('sumHoursProgress');
    const percentEl = document.getElementById('sumHoursPercent');
    const pointsEl = document.getElementById('sumPointsDisplay');
    const countEl = document.getElementById('sumEnteredCount');

    if (cumGpaEl) {
      cumGpaEl.innerHTML = cumGpa !== null ? `${cumGpa.toFixed(2)}<span class="percent-sign" style="font-size:1.4rem; color:var(--text-muted); margin-right:2px;">%</span>` : '--.--%';
    }

    if (evalEl) {
      if (cumGpa !== null && window.CE_GPA_DATA && window.CE_GPA_DATA.getGpaEvaluation) {
        const ev = window.CE_GPA_DATA.getGpaEvaluation(cumGpa);
        evalEl.textContent = ev.label;
        evalEl.style.color = ev.color;
        evalEl.style.backgroundColor = ev.bg;
        evalEl.style.display = 'inline-block';
      } else {
        evalEl.style.display = 'none';
      }
    }

    if (hoursEl) hoursEl.innerHTML = `<strong>${totalHours}</strong> / 167 ساعة`;
    if (progressEl) progressEl.style.width = `${Math.min(100, (totalHours / 167) * 100)}%`;
    if (percentEl) percentEl.textContent = `نسبة إنهاء الخطة: ${((totalHours / 167) * 100).toFixed(1)}%`;
    if (pointsEl) pointsEl.textContent = totalPoints.toFixed(1);
    if (countEl) countEl.textContent = `(${totalEntered}) مساقات تم إدخال علاماتها`;
  }

  function renderFullPlan() {
    const listContainer = document.getElementById('planSemestersList');
    if (!listContainer) return;

    const sems = (window.CE_GPA_DATA && window.CE_GPA_DATA.GPA_PLAN_SEMESTERS) || [];

    listContainer.innerHTML = sems
      .map((sem, idx) => {
        return `
          <div class="sem-calc-box">
            <div class="sem-calc-header" onclick="window.toggleSemCalc('${sem.id}')">
              <div style="display:flex; align-items:center; gap:0.85rem;">
                <span class="sem-num-badge">فصل ${idx + 1}</span>
                <div>
                  <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-main);">${sem.yearTitle} • ${sem.semesterTitle}</h3>
                  <span style="font-size:0.775rem; color:var(--text-muted);">${sem.courses.length} مساقات (${sem.totalHours} ساعة معتمدة)</span>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:1rem;" onclick="event.stopPropagation()">
                <div class="sem-live-gpa" id="sem_gpa_${sem.id}"></div>
                <button type="button" class="sem-fill-btn" onclick="window.fillSemesterGrades('${sem.id}', '${sem.yearTitle} - ${sem.semesterTitle}')">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> ملء سريع
                </button>
                <i class="fa-solid fa-chevron-down" id="arrow_${sem.id}" style="color:var(--text-subtle); transition:transform 0.2s;"></i>
              </div>
            </div>

            <div class="sem-calc-body" id="body_${sem.id}">
              <table class="courses-table">
                <thead>
                  <tr>
                    <th>اسم المساق</th>
                    <th style="width:100px; text-align:center;">الساعات</th>
                    <th style="width:140px; text-align:center;">العلامة (0-100)</th>
                    <th style="width:130px; text-align:center;">النقاط الموزونة</th>
                    <th style="width:160px; text-align:center;">خيارات سريعة</th>
                  </tr>
                </thead>
                <tbody>
                  ${sem.courses
                    .map((c) => {
                      const g = grades[c.id];
                      const val = g !== undefined ? g : '';
                      const weighted = g !== undefined ? (g * c.hours).toFixed(1) : '-';

                      return `
                        <tr>
                          <td><strong>${c.name}</strong></td>
                          <td style="text-align:center;"><span class="hours-chip" style="font-size:0.75rem; padding:0.15rem 0.5rem; background:var(--bg-surface-subtle); border-radius:var(--radius-sm);">${c.hours} ساعة</span></td>
                          <td style="text-align:center;">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.5"
                              id="input_${c.id}"
                              value="${val}"
                              placeholder="0–100"
                              class="grade-input"
                              oninput="window.onGradeInput('${c.id}', this.value)"
                            />
                          </td>
                          <td style="text-align:center;"><span class="weighted-value" id="weighted_${c.id}">${weighted}</span></td>
                          <td style="text-align:center;">
                            <div class="quick-btn-group">
                              <button type="button" onclick="window.setQuickGrade('${c.id}', 90)">90</button>
                              <button type="button" onclick="window.setQuickGrade('${c.id}', 85)">85</button>
                              <button type="button" onclick="window.setQuickGrade('${c.id}', 75)">75</button>
                              <button type="button" onclick="window.clearGrade('${c.id}')" style="color:#EF4444;"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      })
      .join('');

    updateFullPlanCalculations();
  }

  window.toggleSemCalc = function (semId) {
    const body = document.getElementById(`body_${semId}`);
    const arrow = document.getElementById(`arrow_${semId}`);
    if (body) {
      const isHidden = body.style.display === 'none';
      body.style.display = isHidden ? 'block' : 'none';
      if (arrow) arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  };

  // ==========================================
  // MODE B: WHAT-IF CALCULATOR
  // ==========================================
  window.addHypoCourse = function () {
    hypoCourses.push({
      id: 'h_' + Date.now(),
      name: `مساق ${hypoCourses.length + 1}`,
      grade: 80,
      hours: 3,
    });
    saveHypo();
    renderWhatIf();
  };

  window.removeHypoCourse = function (id) {
    hypoCourses = hypoCourses.filter((c) => c.id !== id);
    saveHypo();
    renderWhatIf();
  };

  window.updateHypoCourse = function (id, field, val) {
    const course = hypoCourses.find((c) => c.id === id);
    if (course) {
      if (field === 'grade' || field === 'hours') {
        course[field] = val === '' ? 0 : parseFloat(val) || 0;
      } else {
        course[field] = val;
      }
      saveHypo();
      updateWhatIfCalculations();
    }
  };

  window.syncTotalsFromPlan = function () {
    const sems = (window.CE_GPA_DATA && window.CE_GPA_DATA.GPA_PLAN_SEMESTERS) || [];
    let pts = 0;
    let hrs = 0;
    sems.forEach((sem) => {
      sem.courses.forEach((c) => {
        const g = grades[c.id];
        if (g !== undefined && g !== null && g !== '') {
          pts += g * c.hours;
          hrs += c.hours;
        }
      });
    });

    if (hrs > 0) {
      document.getElementById('whatifPrevHours').value = hrs;
      document.getElementById('whatifPrevGpa').value = (pts / hrs).toFixed(2);
      updateWhatIfCalculations();
    } else {
      alert('لم تقم بإدخال أي علامات في حاسبة الخطة الشاملة بعد! يمكنك إدخال الساعات والمعدل السابق يدوياً.');
    }
  };

  function updateWhatIfCalculations() {
    let semHours = 0;
    let semPoints = 0;

    hypoCourses.forEach((c) => {
      const g = parseFloat(c.grade) || 0;
      const h = parseFloat(c.hours) || 0;
      semHours += h;
      semPoints += g * h;
    });

    const semGpa = semHours > 0 ? semPoints / semHours : null;
    const prevH = parseFloat(document.getElementById('whatifPrevHours')?.value) || 0;
    const prevG = parseFloat(document.getElementById('whatifPrevGpa')?.value) || 0;
    const prevPoints = prevH * prevG;

    const newTotalHours = prevH + semHours;
    const newTotalPoints = prevPoints + semPoints;
    const newCumGpa = newTotalHours > 0 ? newTotalPoints / newTotalHours : null;
    const diff = newCumGpa !== null && prevG > 0 ? newCumGpa - prevG : null;

    const semGpaDisplay = document.getElementById('whatifSemGpaDisplay');
    const semHoursSub = document.getElementById('whatifSemHoursSub');
    const newCumDisplay = document.getElementById('whatifNewCumDisplay');
    const diffBadge = document.getElementById('whatifDiffBadge');

    if (semGpaDisplay) semGpaDisplay.textContent = semGpa !== null ? `${semGpa.toFixed(2)}%` : '--.--%';
    if (semHoursSub) semHoursSub.textContent = `(${semHours} ساعة متوقعة)`;
    if (newCumDisplay) newCumDisplay.textContent = newCumGpa !== null ? `${newCumGpa.toFixed(2)}%` : '--.--%';

    if (diffBadge) {
      if (diff !== null) {
        const isUp = diff >= 0;
        diffBadge.className = `w-diff-badge ${isUp ? 'diff-up' : 'diff-down'}`;
        diffBadge.textContent = `${isUp ? '+' : ''}${diff.toFixed(2)}% ${isUp ? '📈 ارتفاع' : '📉 انخفاض'}`;
        diffBadge.style.display = 'inline-block';
      } else {
        diffBadge.style.display = 'none';
      }
    }
  }

  function renderWhatIf() {
    const tbody = document.getElementById('whatifCoursesTbody');
    if (!tbody) return;

    tbody.innerHTML = hypoCourses
      .map((c) => {
        const weighted = ((c.grade || 0) * (c.hours || 0)).toFixed(1);
        return `
          <tr>
            <td>
              <input
                type="text"
                value="${c.name}"
                class="hypo-name-input"
                onchange="window.updateHypoCourse('${c.id}', 'name', this.value)"
              />
            </td>
            <td style="text-align:center;">
              <input
                type="number"
                min="1"
                max="6"
                value="${c.hours}"
                class="grade-input"
                oninput="window.updateHypoCourse('${c.id}', 'hours', this.value)"
              />
            </td>
            <td style="text-align:center;">
              <input
                type="number"
                min="0"
                max="100"
                value="${c.grade}"
                class="grade-input"
                oninput="window.updateHypoCourse('${c.id}', 'grade', this.value)"
              />
            </td>
            <td style="text-align:center;"><span class="weighted-value">${weighted}</span></td>
            <td style="text-align:center;">
              <button type="button" onclick="window.removeHypoCourse('${c.id}')" style="background:none; border:none; color:#EF4444; cursor:pointer; font-size:0.9rem;">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `;
      })
      .join('');

    updateWhatIfCalculations();
  }

  // ==========================================
  // MODE C: CLASSWORK CONVERTER
  // ==========================================
  window.addClassworkCourse = function () {
    cwList.push({
      id: 'cw_' + Date.now(),
      name: `مساق ${cwList.length + 1}`,
      score: 40,
      maxScore: 50,
      hours: 3,
    });
    renderClasswork();
  };

  window.removeClassworkCourse = function (id) {
    cwList = cwList.filter((c) => c.id !== id);
    renderClasswork();
  };

  window.updateClassworkCourse = function (id, field, val) {
    const item = cwList.find((c) => c.id === id);
    if (item) {
      if (field === 'score' || field === 'maxScore' || field === 'hours') {
        item[field] = val === '' ? 0 : parseFloat(val) || 0;
      } else {
        item[field] = val;
      }
      renderClasswork();
    }
  };

  window.transferCwToWhatIf = function () {
    const converted = cwList.map((item) => {
      const maxS = item.maxScore > 0 ? item.maxScore : 1;
      const equiv = Math.round(((item.score / maxS) * 100) * 10) / 10;
      return {
        id: 'h_from_cw_' + item.id + '_' + Date.now(),
        name: item.name,
        grade: equiv,
        hours: item.hours,
      };
    });

    hypoCourses = converted;
    saveHypo();
    window.switchGpaTab('whatIf');
  };

  function renderClasswork() {
    const tbody = document.getElementById('cwCoursesTbody');
    const bigStat = document.getElementById('cwBigStatDisplay');
    if (!tbody) return;

    let totalCwHours = 0;
    let totalWeightedPoints = 0;

    tbody.innerHTML = cwList
      .map((c) => {
        const maxS = c.maxScore > 0 ? c.maxScore : 1;
        const equiv = (c.score / maxS) * 100;
        const weighted = equiv * c.hours;
        totalCwHours += c.hours;
        totalWeightedPoints += weighted;

        return `
          <tr>
            <td>
              <input
                type="text"
                value="${c.name}"
                class="hypo-name-input"
                onchange="window.updateClassworkCourse('${c.id}', 'name', this.value)"
              />
            </td>
            <td style="text-align:center;">
              <input
                type="number"
                min="0"
                max="${c.maxScore}"
                value="${c.score}"
                class="grade-input"
                oninput="window.updateClassworkCourse('${c.id}', 'score', this.value)"
              />
            </td>
            <td style="text-align:center;">
              <input
                type="number"
                min="1"
                max="100"
                value="${c.maxScore}"
                class="grade-input"
                oninput="window.updateClassworkCourse('${c.id}', 'maxScore', this.value)"
              />
            </td>
            <td style="text-align:center;">
              <input
                type="number"
                min="1"
                max="6"
                value="${c.hours}"
                class="grade-input"
                oninput="window.updateClassworkCourse('${c.id}', 'hours', this.value)"
              />
            </td>
            <td style="text-align:center;"><span class="equiv-grade-chip">${equiv.toFixed(1)}%</span></td>
            <td style="text-align:center;"><span class="weighted-value">${weighted.toFixed(1)}</span></td>
            <td style="text-align:center;">
              <button type="button" onclick="window.removeClassworkCourse('${c.id}')" style="background:none; border:none; color:#EF4444; cursor:pointer; font-size:0.9rem;">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `;
      })
      .join('');

    if (bigStat) {
      const equivGpa = totalCwHours > 0 ? totalWeightedPoints / totalCwHours : null;
      bigStat.textContent = equivGpa !== null ? `${equivGpa.toFixed(2)}%` : '--.--%';
    }
  }

  window.triggerGpaPrint = function () {
    // Open all semesters so grades in all years print properly
    document.querySelectorAll('.sem-accordion').forEach((el) => el.classList.add('open'));
    setTimeout(function () {
      window.print();
    }, 200);
  };

  document.addEventListener('DOMContentLoaded', function () {
    loadSavedData();
    window.switchGpaTab(activeTab);
  });
})();
