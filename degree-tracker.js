/**
 * DEGREE TRACKER & PREREQUISITES TREE JAVASCRIPT
 * Computer Engineering IUG (167 Credit Hours)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ce_passed_courses_v1';
  const TOTAL_HOURS = 167;

  // Complete Official Curriculum with Credit Hours & Exact Prerequisites
  const DEGREE_DATA = [
    // Year 1
    {
      yearKey: 'y1',
      yearTitle: 'السنة الأولى (34 ساعة معتمدة)',
      courses: [
        { id: 'engg1104', name: 'منهجية بحث علمي', code: 'ENGG 1104', hours: 1, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'engg1101', name: 'مقدمة في الهندسة', code: 'ENGG 1101', hours: 1, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'engg1204', name: 'رسم هندسي', code: 'ENGG 1204', hours: 2, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'mathb1301', name: 'تفاضل وتكامل (أ)', code: 'MATHB1301', hours: 3, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'physa1102', name: 'فيزياء عامة عملية (أ)', code: 'PHYSA1102', hours: 1, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'physa1301', name: 'فيزياء عامة (أ)', code: 'PHYSA1301', hours: 3, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'chem1302', name: 'كيمياء عامة', code: 'CHEM 1302', hours: 3, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'engg1103', name: 'تكنولوجيا الورش', code: 'ENGG 1103', hours: 1, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'engg1203', name: 'مقدمة في الحاسوب', code: 'ENGG 1203', hours: 2, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'engg1305', name: 'اللغة الإنجليزية الفنية', code: 'ENGG 1305', hours: 3, prereq: 'لا يوجد', prereqIds: [] },
        { id: 'mathb1401', name: 'تفاضل وتكامل (ب)', code: 'MATHB1401', hours: 3, prereq: 'تفاضل وتكامل (أ)', prereqIds: ['mathb1301'] },
        { id: 'physb1301', name: 'فيزياء عامة (ب)', code: 'PHYSB1301', hours: 3, prereq: 'فيزياء عامة (أ)', prereqIds: ['physa1301'] }
      ]
    },

    // Year 2
    {
      yearKey: 'y2',
      yearTitle: 'السنة الثانية (34 ساعة معتمدة)',
      courses: [
        { id: 'ecom2401', name: 'برمجة الحاسوب (1)', code: 'ECOM 2401', hours: 3, prereq: 'مقدمة في الحاسوب', prereqIds: ['engg1203'] },
        { id: 'ecom2411', name: 'التصميم الرقمي (1)', code: 'ECOM 2411', hours: 3, prereq: 'مقدمة في الحاسوب', prereqIds: ['engg1203'] },
        { id: 'eele2310', name: 'دوائر كهربائية (1)', code: 'EELE 2310', hours: 3, prereq: 'فيزياء عامة (ب)', prereqIds: ['physb1301'] },
        { id: 'eele2110', name: 'مختبر دوائر كهربائية (1)', code: 'EELE 2110', hours: 1, prereq: 'دوائر كهربائية (1)', prereqIds: ['eele2310'] },
        { id: 'math2341', name: 'جبر خطي', code: 'MATH 2341', hours: 3, prereq: 'تفاضل وتكامل (أ)', prereqIds: ['mathb1301'] },
        { id: 'ecom2402', name: 'برمجة الحاسوب (2)', code: 'ECOM 2402', hours: 3, prereq: 'برمجة الحاسوب (1)', prereqIds: ['ecom2401'] },
        { id: 'ecom2421', name: 'التصميم الرقمي (2)', code: 'ECOM 2421', hours: 3, prereq: 'التصميم الرقمي (1)', prereqIds: ['ecom2411'] },
        { id: 'eele2320', name: 'إلكترونيات (1)', code: 'EELE 2320', hours: 3, prereq: 'دوائر كهربائية (1)', prereqIds: ['eele2310'] },
        { id: 'eele2120', name: 'مختبر إلكترونيات (1)', code: 'EELE 2120', hours: 1, prereq: 'إلكترونيات (1)', prereqIds: ['eele2320'] },
        { id: 'math2302', name: 'معادلات تفاضلية عادية', code: 'MATH 2302', hours: 3, prereq: 'تفاضل وتكامل (ب)', prereqIds: ['mathb1401'] }
      ]
    },

    // Year 3
    {
      yearKey: 'y3',
      yearTitle: 'السنة الثالثة (36 ساعة معتمدة)',
      courses: [
        { id: 'ecom3411', name: 'الرياضيات المتقطعة', code: 'ECOM 3411', hours: 3, prereq: 'برمجة الحاسوب (1)', prereqIds: ['ecom2401'] },
        { id: 'ecom3412', name: 'هياكل البيانات والخوارزميات', code: 'ECOM 3412', hours: 3, prereq: 'برمجة الحاسوب (2)', prereqIds: ['ecom2402'] },
        { id: 'eele3310', name: 'الإشارات والأنظمة الخطية', code: 'EELE 3310', hours: 3, prereq: 'معادلات تفاضلية + دوائر (1)', prereqIds: ['math2302', 'eele2310'] },
        { id: 'eele3110', name: 'مختبر إشارات وأنظمة خطية', code: 'EELE 3110', hours: 1, prereq: 'إشارات وأنظمة خطية', prereqIds: ['eele3310'] },
        { id: 'eele3340', name: 'نظرية الاحتمالات والإحصاء', code: 'EELE 3340', hours: 3, prereq: 'تفاضل وتكامل (ب)', prereqIds: ['mathb1401'] },
        { id: 'ecom3421', name: 'معمارية الحاسوب', code: 'ECOM 3421', hours: 3, prereq: 'التصميم الرقمي (2)', prereqIds: ['ecom2421'] },
        { id: 'ecom3422', name: 'نظم قواعد البيانات', code: 'ECOM 3422', hours: 3, prereq: 'هياكل البيانات والخوارزميات', prereqIds: ['ecom3412'] },
        { id: 'eele3321', name: 'الإلكترونيات الرقمية', code: 'EELE 3321', hours: 3, prereq: 'إلكترونيات (1) + تصميم رقمي (1)', prereqIds: ['eele2320', 'ecom2411'] },
        { id: 'eele3121', name: 'مختبر إلكترونيات رقمية', code: 'EELE 3121', hours: 1, prereq: 'إلكترونيات رقمية', prereqIds: ['eele3321'] },
        { id: 'eele3360', name: 'أنظمة التحكم الخطي', code: 'EELE 3360', hours: 3, prereq: 'الإشارات والأنظمة الخطية', prereqIds: ['eele3310'] },
        { id: 'eele3160', name: 'مختبر تحكم خطي', code: 'EELE 3160', hours: 1, prereq: 'أنظمة التحكم الخطي', prereqIds: ['eele3360'] }
      ]
    },

    // Year 4
    {
      yearKey: 'y4',
      yearTitle: 'السنة الرابعة (34 ساعة معتمدة)',
      courses: [
        { id: 'ecom4401', name: 'نظم التشغيل', code: 'ECOM 4401', hours: 3, prereq: 'هياكل البيانات + معمارية الحاسوب', prereqIds: ['ecom3412', 'ecom3421'] },
        { id: 'ecom4411', name: 'اتصالات البيانات', code: 'ECOM 4411', hours: 3, prereq: 'إشارات وأنظمة خطية + احتمالات', prereqIds: ['eele3310', 'eele3340'] },
        { id: 'ecom4412', name: 'لغة التجميع والمعالجات', code: 'ECOM 4412', hours: 3, prereq: 'معمارية الحاسوب', prereqIds: ['ecom3421'] },
        { id: 'ecom5000', name: 'تدريب عملي ميداني (250 ساعة)', code: 'ECOM 5000', hours: 2, prereq: 'إنجاز 100 ساعة معتمدة', prereqIds: [] },
        { id: 'ecom4421', name: 'شبكات الحاسوب', code: 'ECOM 4421', hours: 3, prereq: 'اتصالات البيانات + نظم التشغيل', prereqIds: ['ecom4411', 'ecom4401'] },
        { id: 'ecom4422', name: 'الأنظمة المدمجة', code: 'ECOM 4422', hours: 3, prereq: 'لغة التجميع + معمارية الحاسوب', prereqIds: ['ecom4412', 'ecom3421'] },
        { id: 'ecom4423', name: 'هندسة البرمجيات', code: 'ECOM 4423', hours: 3, prereq: 'نظم قواعد البيانات', prereqIds: ['ecom3422'] },
        { id: 'ecom4424', name: 'أمن أنظمة الحاسوب والشبكات', code: 'ECOM 4424', hours: 3, prereq: 'شبكات الحاسوب', prereqIds: ['ecom4421'] }
      ]
    },

    // Year 5
    {
      yearKey: 'y5',
      yearTitle: 'السنة الخامسة والتخرج (29 ساعة معتمدة)',
      courses: [
        { id: 'ecom5201', name: 'مشروع التخرج (1)', code: 'ECOM 5201', hours: 2, prereq: 'إنجاز 120 ساعة معتمدة', prereqIds: [] },
        { id: 'ecom5311', name: 'الذكاء الاصطناعي وتعلم الآلة', code: 'ECOM 5311', hours: 3, prereq: 'هياكل البيانات + احتمالات', prereqIds: ['ecom3412', 'eele3340'] },
        { id: 'ecom5312', name: 'معالجة الصور الرقمية', code: 'ECOM 5312', hours: 3, prereq: 'إشارات وأنظمة خطية', prereqIds: ['eele3310'] },
        { id: 'ecom5202', name: 'مشروع التخرج (2)', code: 'ECOM 5202', hours: 4, prereq: 'مشروع التخرج (1)', prereqIds: ['ecom5201'] },
        { id: 'ecom5321', name: 'الحوسبة السحابية والموزعة', code: 'ECOM 5321', hours: 3, prereq: 'شبكات الحاسوب + نظم التشغيل', prereqIds: ['ecom4421', 'ecom4401'] },
        { id: 'ecom5448', name: 'التعلم العميق (Deep Learning)', code: 'ECOM 5448', hours: 3, prereq: 'الذكاء الاصطناعي', prereqIds: ['ecom5311'] }
      ]
    }
  ];

  let passedCourseIds = [];
  let currentFilter = 'all';

  const passedHoursDisplayEl = document.getElementById('passedHoursDisplay');
  const percentDisplayEl = document.getElementById('percentDisplay');
  const remainingHoursDisplayEl = document.getElementById('remainingHoursDisplay');
  const eligibleCountDisplayEl = document.getElementById('eligibleCountDisplay');
  const progressBarFillEl = document.getElementById('progressBarFill');
  const yearsContainerEl = document.getElementById('yearsContainer');
  const resetProgressBtn = document.getElementById('resetProgressBtn');
  const selectAllBtn = document.getElementById('selectAllBtn');
  const printTrackerBtn = document.getElementById('printTrackerBtn');

  function loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        passedCourseIds = JSON.parse(data);
      }
    } catch (e) {
      passedCourseIds = [];
    }
    renderAll();
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(passedCourseIds));
    } catch (e) {}
  }

  window.toggleCoursePassed = function (courseId) {
    if (passedCourseIds.includes(courseId)) {
      passedCourseIds = passedCourseIds.filter(function (id) { return id !== courseId; });
    } else {
      passedCourseIds.push(courseId);
    }
    saveProgress();
    renderAll();
  };

  function isCourseEligible(course) {
    if (passedCourseIds.includes(course.id)) return false;
    if (!course.prereqIds || course.prereqIds.length === 0) return true;
    return course.prereqIds.every(function (reqId) { return passedCourseIds.includes(reqId); });
  }

  function calculateStats() {
    let passedHours = 0;
    let eligibleCount = 0;

    DEGREE_DATA.forEach(function (year) {
      year.courses.forEach(function (c) {
        if (passedCourseIds.includes(c.id)) {
          passedHours += c.hours;
        } else if (isCourseEligible(c)) {
          eligibleCount++;
        }
      });
    });

    const percent = Math.min(100, (passedHours / TOTAL_HOURS) * 100);
    const remainingHours = Math.max(0, TOTAL_HOURS - passedHours);

    if (passedHoursDisplayEl) passedHoursDisplayEl.textContent = passedHours + ' / ' + TOTAL_HOURS;
    if (percentDisplayEl) percentDisplayEl.textContent = percent.toFixed(1) + '%';
    if (remainingHoursDisplayEl) remainingHoursDisplayEl.textContent = remainingHours + ' س';
    if (eligibleCountDisplayEl) eligibleCountDisplayEl.textContent = eligibleCount;
    if (progressBarFillEl) progressBarFillEl.style.width = percent + '%';
  }

  function renderAll() {
    calculateStats();

    if (!yearsContainerEl) return;

    let html = '';

    DEGREE_DATA.forEach(function (year) {
      const filteredCourses = year.courses.filter(function (c) {
        const isPassed = passedCourseIds.includes(c.id);
        const isEligible = isCourseEligible(c);

        if (currentFilter === 'passed') return isPassed;
        if (currentFilter === 'remaining') return !isPassed;
        if (currentFilter === 'eligible') return isEligible;
        return true;
      });

      if (filteredCourses.length === 0) return;

      html += '<div class="tracker-year-group animate-fade-in">';
      html += '<div class="tracker-year-head">';
      html += '<h3 class="tracker-year-title"><i class="fa-solid fa-graduation-cap" style="color:var(--accent-amber);"></i> ' + year.yearTitle + '</h3>';
      html += '<span style="font-size:0.75rem; color:var(--text-subtle);">' + filteredCourses.length + ' مساقات</span>';
      html += '</div>';

      html += '<div class="tracker-courses-grid">';
      filteredCourses.forEach(function (c) {
        const isPassed = passedCourseIds.includes(c.id);
        const isEligible = isCourseEligible(c);

        let cardClass = '';
        let statusTag = '';

        if (isPassed) {
          cardClass = 'is-passed';
          statusTag = '<span class="tc-status-tag tag-passed"><i class="fa-solid fa-check"></i> منجزة</span>';
        } else if (isEligible) {
          cardClass = 'is-eligible';
          statusTag = '<span class="tc-status-tag tag-open"><i class="fa-solid fa-unlock"></i> متاحة للتسجيل 🟢</span>';
        } else {
          cardClass = 'is-locked';
          statusTag = '<span class="tc-status-tag tag-locked"><i class="fa-solid fa-lock"></i> تتطلب متطلب سابق</span>';
        }

        html += '<div class="tracker-course-card ' + cardClass + '" onclick="window.toggleCoursePassed(\'' + c.id + '\')" title="انقر لتحديد حالة المادة كمنجزة أو قيد الانتظار">';
        html += '<div class="tc-top-row">';
        html += '<div style="flex:1;">';
        html += '<div class="tc-badges-row">';
        html += '<span class="tc-code-badge">' + c.code + '</span>';
        html += '<span class="tc-hours-badge">' + c.hours + ' س.م</span>';
        html += statusTag;
        html += '</div>';
        html += '<h4 class="tc-name">' + c.name + '</h4>';
        html += '</div>';
        html += '<div class="tc-check-circle"><i class="fa-solid fa-check"></i></div>';
        html += '</div>';

        html += '<div class="tc-prereq-info">';
        html += '<i class="fa-solid fa-link"></i> ';
        html += '<span>المتطلب السابق: <strong>' + c.prereq + '</strong></span>';
        html += '</div>';
        html += '</div>';
      });

      html += '</div></div>';
    });

    yearsContainerEl.innerHTML = html || '<div style="text-align:center; padding:3rem 1rem; color:var(--text-subtle);"><i class="fa-solid fa-filter" style="font-size:2rem; margin-bottom:0.5rem; opacity:0.5; display:block;"></i><span>لا توجد مواد تطابق هذا الفلتر حالياً.</span></div>';
  }

  function initFilterChips() {
    document.querySelectorAll('.t-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.t-chip').forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        currentFilter = this.dataset.filter || 'all';
        renderAll();
      });
    });
  }

  function initActions() {
    if (resetProgressBtn) {
      resetProgressBtn.addEventListener('click', function () {
        if (confirm('هل أنت متأكد من إعادة ضبط وتصفير المواد المنجزة؟')) {
          passedCourseIds = [];
          saveProgress();
          renderAll();
        }
      });
    }

    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', function () {
        const allIds = [];
        DEGREE_DATA.forEach(function (y) { y.courses.forEach(function (c) { allIds.push(c.id); }); });
        passedCourseIds = allIds;
        saveProgress();
        renderAll();
      });
    }

    if (printTrackerBtn) {
      printTrackerBtn.addEventListener('click', function () {
        window.print();
      });
    }
  }

  function init() {
    initFilterChips();
    initActions();
    loadProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
