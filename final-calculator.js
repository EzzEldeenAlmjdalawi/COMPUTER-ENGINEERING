/**
 * FINAL EXAM TARGET CALCULATOR JAVASCRIPT
 * Computer Engineering IUG
 */

(function () {
  'use strict';

  // State
  let currentMode = 'simple'; // 'simple' | 'detailed'
  let targetScore = 80;
  let finalWeight = 40;
  let courseWorkMax = 60;
  let savedCourses = [];

  const STORAGE_KEY = 'ce_final_calc_courses_v1';

  // Elements
  const courseSelectEl = document.getElementById('calcCourseSelect');
  const customCourseNameEl = document.getElementById('customCourseName');
  const courseWorkInputEl = document.getElementById('courseWorkScore');
  const finalWeightSelectEl = document.getElementById('finalWeightSelect');
  const targetGradeInputEl = document.getElementById('targetGradeInput');
  const modeSimpleBtn = document.getElementById('modeSimpleBtn');
  const modeDetailedBtn = document.getElementById('modeDetailedBtn');
  const simpleInputsGroup = document.getElementById('simpleInputsGroup');
  const detailedInputsGroup = document.getElementById('detailedInputsGroup');

  // Detailed inputs
  const dMidtermEl = document.getElementById('dMidterm');
  const dQuizEl = document.getElementById('dQuiz');
  const dLabEl = document.getElementById('dLab');
  const dHwEl = document.getElementById('dHw');

  // Outputs
  const resultDisplayNumberEl = document.getElementById('resultDisplayNumber');
  const resultDisplayMaxEl = document.getElementById('resultDisplayMax');
  const resultStatusBadgeEl = document.getElementById('resultStatusBadge');
  const resultAdviceTextEl = document.getElementById('resultAdviceText');
  const savedCoursesListEl = document.getElementById('savedCoursesList');
  const savedCountBadgeEl = document.getElementById('savedCountBadge');
  const addCourseBtn = document.getElementById('addCourseBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const printReportBtn = document.getElementById('printReportBtn');

  // Populate course select from CE_DATA
  function initCourseSelect() {
    if (!courseSelectEl) return;
    const allSubs = (window.CE_DATA && window.CE_DATA.allSubjects) || [];
    
    // Sort alphabetically by name
    const sorted = [...allSubs].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    
    let html = '<option value="">-- اختر مادة من الخطة الدراسية أو اكتب مادة مخصصة --</option>';
    sorted.forEach((s) => {
      const codeStr = s.code ? ` [${s.code}]` : '';
      html += `<option value="${s.name}" data-code="${s.code || ''}">${s.name}${codeStr}</option>`;
    });
    courseSelectEl.innerHTML = html;

    courseSelectEl.addEventListener('change', function () {
      if (courseSelectEl.value && customCourseNameEl) {
        customCourseNameEl.value = courseSelectEl.value;
      }
      calculateTarget();
    });
  }

  // Load from LocalStorage
  function loadSavedCourses() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        savedCourses = JSON.parse(data);
      }
    } catch (e) {
      savedCourses = [];
    }
    renderSavedCourses();
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCourses));
    } catch (e) {}
  }

  // Switch Mode
  function setMode(mode) {
    currentMode = mode;
    if (mode === 'simple') {
      modeSimpleBtn.classList.add('active');
      modeDetailedBtn.classList.remove('active');
      simpleInputsGroup.style.display = 'block';
      detailedInputsGroup.style.display = 'none';
    } else {
      modeDetailedBtn.classList.add('active');
      modeSimpleBtn.classList.remove('active');
      simpleInputsGroup.style.display = 'none';
      detailedInputsGroup.style.display = 'block';
    }
    calculateTarget();
  }

  // Core Math Calculation
  function calculateTarget() {
    finalWeight = parseFloat(finalWeightSelectEl.value) || 40;
    courseWorkMax = 100 - finalWeight;
    targetScore = parseFloat(targetGradeInputEl.value) || 0;

    let currentWorkScore = 0;

    if (currentMode === 'simple') {
      currentWorkScore = parseFloat(courseWorkInputEl.value) || 0;
    } else {
      const mid = parseFloat(dMidtermEl.value) || 0;
      const q = parseFloat(dQuizEl.value) || 0;
      const lab = parseFloat(dLabEl.value) || 0;
      const hw = parseFloat(dHwEl.value) || 0;
      currentWorkScore = mid + q + lab + hw;
    }

    // Required points in final exam
    const neededPoints = targetScore - currentWorkScore;
    const maxPossibleTotal = currentWorkScore + finalWeight;

    resultDisplayMaxEl.textContent = `من ${finalWeight}`;

    if (targetScore <= 0) {
      resultDisplayNumberEl.textContent = '--';
      resultStatusBadgeEl.className = 'result-status-badge status-medium';
      resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-circle-info"></i> أدخل التقدير أو العلامة المستهدفة';
      resultAdviceTextEl.textContent = 'أدخل علاماتك لتحديد النتيجة المطلوبة في الامتحان النهائي بدقة.';
      return;
    }

    if (neededPoints <= 0) {
      // Already achieved
      resultDisplayNumberEl.textContent = '0.0';
      resultStatusBadgeEl.className = 'result-status-badge status-easy';
      resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-trophy"></i> مبروك! الهدف محقق مسبقاً 🎉';
      resultAdviceTextEl.textContent = `أعمالك الفصلية (${currentWorkScore.toFixed(1)}) كافية لتحقيق هدفك (${targetScore}) دون الحاجة لأي علامة في الفاينل!`;
    } else if (neededPoints > finalWeight) {
      // Impossible
      resultDisplayNumberEl.textContent = neededPoints.toFixed(1);
      resultStatusBadgeEl.className = 'result-status-badge status-impossible';
      resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> غير متاح حسابياً';
      resultAdviceTextEl.textContent = `تحتاج (${neededPoints.toFixed(1)} من ${finalWeight}) وهذا يتجاوز الدرجة الكاملة. أقصى علامة نهائية ممكنة في هذه المادة هي (${maxPossibleTotal.toFixed(1)}%).`;
    } else {
      // Normal attainable range
      resultDisplayNumberEl.textContent = neededPoints.toFixed(1);
      const percentOfFinal = (neededPoints / finalWeight) * 100;

      if (percentOfFinal <= 55) {
        resultStatusBadgeEl.className = 'result-status-badge status-easy';
        resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> سهلة وفي المتناول بإذن الله 🟢';
        resultAdviceTextEl.textContent = `تحتاج فقط إلى ${neededPoints.toFixed(1)} من ${finalWeight} (${percentOfFinal.toFixed(0)}% من الفاينل). مراجعة سريعة تضمن لك الهدف!`;
      } else if (percentOfFinal <= 75) {
        resultStatusBadgeEl.className = 'result-status-badge status-medium';
        resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-thumbs-up"></i> ممتازة مع دراسة منظمة 🔵';
        resultAdviceTextEl.textContent = `تحتاج إلى ${neededPoints.toFixed(1)} من ${finalWeight} (${percentOfFinal.toFixed(0)}% من الفاينل). جهز سلايداتك وامتحانات السنوات السابقة!`;
      } else if (percentOfFinal <= 90) {
        resultStatusBadgeEl.className = 'result-status-badge status-hard';
        resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-fire"></i> تتطلب تركيزاً ومجهوداً مضاعفاً 🟡';
        resultAdviceTextEl.textContent = `تحتاج إلى ${neededPoints.toFixed(1)} من ${finalWeight} (${percentOfFinal.toFixed(0)}% من الفاينل). ركز على أسئلة الفاينل والمسائل الشاملة!`;
      } else {
        resultStatusBadgeEl.className = 'result-status-badge status-critical';
        resultStatusBadgeEl.innerHTML = '<i class="fa-solid fa-bolt"></i> تحدٍ قوي - تتطلب أداءً استثنائياً 🔴';
        resultAdviceTextEl.textContent = `تحتاج إلى ${neededPoints.toFixed(1)} من ${finalWeight} (${percentOfFinal.toFixed(0)}% من الفاينل). لا تترك أي تفصيلة في المادة وادرس بجد!`;
      }
    }
  }

  // Preset Target Chips
  function initPresetChips() {
    document.querySelectorAll('.preset-chip').forEach((chip) => {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.preset-chip').forEach((c) => c.classList.remove('active'));
        this.classList.add('active');
        const val = this.dataset.val;
        targetGradeInputEl.value = val;
        calculateTarget();
      });
    });
  }

  // Add course to saved semester list
  function addCourseToSemester() {
    let name = (customCourseNameEl && customCourseNameEl.value.trim()) || (courseSelectEl && courseSelectEl.value.trim());
    if (!name) name = 'مساق غير مسمى';

    finalWeight = parseFloat(finalWeightSelectEl.value) || 40;
    targetScore = parseFloat(targetGradeInputEl.value) || 80;

    let currentWork = 0;
    if (currentMode === 'simple') {
      currentWork = parseFloat(courseWorkInputEl.value) || 0;
    } else {
      const mid = parseFloat(dMidtermEl.value) || 0;
      const q = parseFloat(dQuizEl.value) || 0;
      const lab = parseFloat(dLabEl.value) || 0;
      const hw = parseFloat(dHwEl.value) || 0;
      currentWork = mid + q + lab + hw;
    }

    const needed = targetScore - currentWork;

    const newCourse = {
      id: Date.now(),
      name: name,
      workScore: currentWork,
      finalWeight: finalWeight,
      targetScore: targetScore,
      neededFinal: needed
    };

    savedCourses.push(newCourse);
    saveToStorage();
    renderSavedCourses();

    // Reset input feedback
    if (customCourseNameEl) customCourseNameEl.value = '';
    if (courseSelectEl) courseSelectEl.value = '';
  }

  // Render Saved Courses
  function renderSavedCourses() {
    if (!savedCoursesListEl) return;

    if (savedCountBadgeEl) {
      savedCountBadgeEl.textContent = savedCourses.length;
    }

    if (savedCourses.length === 0) {
      savedCoursesListEl.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem; color:var(--text-subtle);">
          <i class="fa-solid fa-clipboard-list" style="font-size:2rem; margin-bottom:0.5rem; opacity:0.5; display:block;"></i>
          <span>لم تقم بإضافة أي مساقات بعد. احسب علامة أي مادة ثم اضغط <strong>"إضافة إلى جدول الفصل"</strong></span>
        </div>
      `;
      return;
    }

    savedCoursesListEl.innerHTML = savedCourses
      .map((c, idx) => {
        let statusClass = 'color: #10B981;';
        let statusText = 'متاح';
        if (c.neededFinal <= 0) {
          statusText = 'محقق مسبقاً 🏆';
        } else if (c.neededFinal > c.finalWeight) {
          statusClass = 'color: #EF4444;';
          statusText = 'غير متاح ⚠️';
        } else if (c.neededFinal / c.finalWeight > 0.8) {
          statusClass = 'color: #F59E0B;';
          statusText = 'يحتاج مجهود 🔥';
        }

        return `
          <div class="saved-course-card">
            <div class="saved-course-info">
              <h4 class="saved-course-name">${c.name}</h4>
              <div class="saved-course-meta">
                أعمال الفصل: <strong>${c.workScore.toFixed(1)}</strong> • الهدف: <strong>${c.targetScore}%</strong> • وزن الفاينل: <strong>${c.finalWeight}%</strong>
              </div>
            </div>
            <div style="text-align:left;">
              <div class="saved-course-req" style="${statusClass}">
                ${c.neededFinal > 0 ? c.neededFinal.toFixed(1) : '0.0'} <span style="font-size:0.75rem; color:var(--text-subtle);">/ ${c.finalWeight}</span>
              </div>
              <span style="font-size:0.7rem; ${statusClass}">${statusText}</span>
            </div>
            <button type="button" class="saved-course-del" onclick="window.deleteCalcCourse(${c.id})" title="حذف المساق">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;
      })
      .join('');
  }

  window.deleteCalcCourse = function (id) {
    savedCourses = savedCourses.filter((c) => c.id !== id);
    saveToStorage();
    renderSavedCourses();
  };

  function clearAllCourses() {
    if (savedCourses.length === 0) return;
    if (confirm('هل أنت متأكد من مسح جميع المساقات المحفوظة في جدول الفصل؟')) {
      savedCourses = [];
      saveToStorage();
      renderSavedCourses();
    }
  }

  // Event Listeners
  function initEvents() {
    if (courseWorkInputEl) courseWorkInputEl.addEventListener('input', calculateTarget);
    if (finalWeightSelectEl) finalWeightSelectEl.addEventListener('change', calculateTarget);
    if (targetGradeInputEl) targetGradeInputEl.addEventListener('input', calculateTarget);

    if (dMidtermEl) dMidtermEl.addEventListener('input', calculateTarget);
    if (dQuizEl) dQuizEl.addEventListener('input', calculateTarget);
    if (dLabEl) dLabEl.addEventListener('input', calculateTarget);
    if (dHwEl) dHwEl.addEventListener('input', calculateTarget);

    if (modeSimpleBtn) modeSimpleBtn.addEventListener('click', () => setMode('simple'));
    if (modeDetailedBtn) modeDetailedBtn.addEventListener('click', () => setMode('detailed'));

    if (addCourseBtn) addCourseBtn.addEventListener('click', addCourseToSemester);
    if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllCourses);
    if (printReportBtn) printReportBtn.addEventListener('click', () => window.print());
  }

  // Init on DOM ready
  function init() {
    initCourseSelect();
    initPresetChips();
    initEvents();
    loadSavedCourses();
    calculateTarget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
