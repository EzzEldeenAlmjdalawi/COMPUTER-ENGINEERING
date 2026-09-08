/**
 * WEEKLY SCHEDULE BUILDER JAVASCRIPT
 * Computer Engineering IUG
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ce_student_schedule_v1';

  // Days order: Sat(0), Sun(1), Mon(2), Tue(3), Wed(4), Thu(5)
  const DAYS = [
    { key: 'sat', label: 'السبت' },
    { key: 'sun', label: 'الأحد' },
    { key: 'mon', label: 'الإثنين' },
    { key: 'tue', label: 'الثلاثاء' },
    { key: 'wed', label: 'الأربعاء' },
    { key: 'thu', label: 'الخميس' }
  ];

  // Hours: 8:00 to 17:00 (5:00 PM)
  const TIME_SLOTS = [
    { start: '08:00', end: '09:00', label: '08:00 - 09:00' },
    { start: '09:00', end: '10:00', label: '09:00 - 10:00' },
    { start: '10:00', end: '11:00', label: '10:00 - 11:00' },
    { start: '11:00', end: '12:00', label: '11:00 - 12:00' },
    { start: '12:00', end: '13:00', label: '12:00 - 01:00' },
    { start: '13:00', end: '14:00', label: '01:00 - 02:00' },
    { start: '14:00', end: '15:00', label: '02:00 - 03:00' },
    { start: '15:00', end: '16:00', label: '03:00 - 04:00' },
    { start: '16:00', end: '17:00', label: '04:00 - 05:00' }
  ];

  let scheduleEvents = [];
  let selectedDays = ['sat', 'mon', 'wed'];
  let selectedColor = 'blue';

  // DOM Elements
  const timetableGridEl = document.getElementById('timetableGrid');
  const addClassModalEl = document.getElementById('addClassModal');
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const saveClassBtn = document.getElementById('saveClassBtn');
  const clearScheduleBtn = document.getElementById('clearScheduleBtn');
  const exportImageBtn = document.getElementById('exportImageBtn');
  const printScheduleBtn = document.getElementById('printScheduleBtn');

  // Form Fields
  const courseSelectEl = document.getElementById('schCourseSelect');
  const courseNameInputEl = document.getElementById('schCourseName');
  const roomInputEl = document.getElementById('schRoom');
  const instructorInputEl = document.getElementById('schInstructor');
  const startTimeSelectEl = document.getElementById('schStartTime');
  const endTimeSelectEl = document.getElementById('schEndTime');
  const patternSelectEl = document.getElementById('schPatternSelect');
  const customDaysRowEl = document.getElementById('schCustomDaysRow');

  // Load from Storage
  function loadSchedule() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        scheduleEvents = JSON.parse(data);
      }
    } catch (e) {
      scheduleEvents = [];
    }
    renderTimetable();
  }

  function saveSchedule() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleEvents));
    } catch (e) {}
  }

  // Populate Course Dropdown
  function initCourseSelect() {
    if (!courseSelectEl) return;
    const allSubs = (window.CE_DATA && window.CE_DATA.allSubjects) || [];
    const sorted = [...allSubs].sort((a, b) => a.name.localeCompare(b.name, 'ar'));

    let html = '<option value="">-- اختر مادة من الخطة أو اكتب اسماً مخصصاً --</option>';
    sorted.forEach((s) => {
      const codeStr = s.code ? ` [${s.code}]` : '';
      html += `<option value="${s.name}" data-code="${s.code || ''}">${s.name}${codeStr}</option>`;
    });
    courseSelectEl.innerHTML = html;

    courseSelectEl.addEventListener('change', function () {
      if (courseSelectEl.value && courseNameInputEl) {
        courseNameInputEl.value = courseSelectEl.value;
      }
    });
  }

  // Populate Times
  function initTimeSelects() {
    const times = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00'
    ];

    let startHtml = '';
    let endHtml = '';
    times.forEach((t) => {
      startHtml += `<option value="${t}">${t}</option>`;
      endHtml += `<option value="${t}">${t}</option>`;
    });

    if (startTimeSelectEl) startTimeSelectEl.innerHTML = startHtml;
    if (endTimeSelectEl) endTimeSelectEl.innerHTML = endHtml;

    if (startTimeSelectEl) startTimeSelectEl.value = '08:00';
    if (endTimeSelectEl) endTimeSelectEl.value = '09:30';
  }

  // Color Palette
  function initColors() {
    document.querySelectorAll('.sch-color-dot').forEach((dot) => {
      dot.addEventListener('click', function () {
        document.querySelectorAll('.sch-color-dot').forEach((d) => d.classList.remove('selected'));
        this.classList.add('selected');
        selectedColor = this.dataset.color || 'blue';
      });
    });
  }

  // Day pattern chips
  function initDayPatterns() {
    if (patternSelectEl) {
      patternSelectEl.addEventListener('change', function () {
        const val = patternSelectEl.value;
        if (val === 'sat-mon-wed') {
          selectedDays = ['sat', 'mon', 'wed'];
          if (customDaysRowEl) customDaysRowEl.style.display = 'none';
        } else if (val === 'sun-tue-thu') {
          selectedDays = ['sun', 'tue', 'thu'];
          if (customDaysRowEl) customDaysRowEl.style.display = 'none';
        } else {
          if (customDaysRowEl) customDaysRowEl.style.display = 'flex';
        }
        updateDayChipsUI();
      });
    }

    document.querySelectorAll('.sch-day-chip').forEach((chip) => {
      chip.addEventListener('click', function () {
        const d = this.dataset.day;
        if (selectedDays.includes(d)) {
          selectedDays = selectedDays.filter((x) => x !== d);
        } else {
          selectedDays.push(d);
        }
        updateDayChipsUI();
      });
    });
  }

  function updateDayChipsUI() {
    document.querySelectorAll('.sch-day-chip').forEach((chip) => {
      const d = chip.dataset.day;
      chip.classList.toggle('active', selectedDays.includes(d));
    });
  }

  // Modal open/close
  function openModal() {
    if (addClassModalEl) addClassModalEl.style.display = 'flex';
  }

  function closeModal() {
    if (addClassModalEl) addClassModalEl.style.display = 'none';
  }

  // Time conversion helper
  function timeToMinutes(t) {
    const parts = t.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  // Add Class Submission
  function handleAddClass() {
    let name = (courseNameInputEl && courseNameInputEl.value.trim()) || (courseSelectEl && courseSelectEl.value.trim());
    if (!name) {
      alert('يرجى كتابة اسم المساق أو اختياره من القائمة.');
      return;
    }

    const room = (roomInputEl && roomInputEl.value.trim()) || '';
    const instructor = (instructorInputEl && instructorInputEl.value.trim()) || '';
    const startTime = (startTimeSelectEl && startTimeSelectEl.value) || '08:00';
    const endTime = (endTimeSelectEl && endTimeSelectEl.value) || '09:30';

    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      alert('وقت نهاية المحاضرة يجب أن يكون بعد وقت البدء!');
      return;
    }

    if (selectedDays.length === 0) {
      alert('يرجى تحديد يوم واحد على الأقل للمحاضرة.');
      return;
    }

    // Check conflict
    let hasConflict = false;
    let conflictName = '';
    selectedDays.forEach((dayKey) => {
      scheduleEvents.forEach((ev) => {
        if (ev.days.includes(dayKey)) {
          const evStart = timeToMinutes(ev.startTime);
          const evEnd = timeToMinutes(ev.endTime);
          const curStart = timeToMinutes(startTime);
          const curEnd = timeToMinutes(endTime);

          if (curStart < evEnd && curEnd > evStart) {
            hasConflict = true;
            conflictName = `${ev.name} (${ev.startTime} - ${ev.endTime})`;
          }
        }
      });
    });

    if (hasConflict) {
      const proceed = confirm(`تنبيه تعارض زمني ⚠️: هناك محاضرة أخرى في نفس الموعد: [${conflictName}]. هل ترغب في إضافتها على أي حال؟`);
      if (!proceed) return;
    }

    const newClass = {
      id: Date.now(),
      name: name,
      room: room,
      instructor: instructor,
      startTime: startTime,
      endTime: endTime,
      days: [...selectedDays],
      color: selectedColor
    };

    scheduleEvents.push(newClass);
    saveSchedule();
    renderTimetable();
    closeModal();

    // Reset Form
    if (courseNameInputEl) courseNameInputEl.value = '';
    if (roomInputEl) roomInputEl.value = '';
    if (instructorInputEl) instructorInputEl.value = '';
  }

  // Render Grid
  function renderTimetable() {
    if (!timetableGridEl) return;

    let html = '';

    // 1. Header Row
    html += '<div class="tt-header-cell">الوقت</div>';
    DAYS.forEach((d) => {
      html += `<div class="tt-header-cell">${d.label}</div>`;
    });

    // 2. Rows by Hour (08:00 to 17:00)
    TIME_SLOTS.forEach((slot) => {
      html += `<div class="tt-time-cell">${slot.label}</div>`;

      DAYS.forEach((d) => {
        const slotStartMin = timeToMinutes(slot.start);
        const slotEndMin = timeToMinutes(slot.end);

        // Find events that intersect this slot & day
        const matching = scheduleEvents.filter((ev) => {
          if (!ev.days.includes(d.key)) return false;
          const evStartMin = timeToMinutes(ev.startTime);
          const evEndMin = timeToMinutes(ev.endTime);
          return evStartMin < slotEndMin && evEndMin > slotStartMin;
        });

        html += `<div class="tt-slot-cell">`;
        matching.forEach((ev) => {
          html += `
            <div class="tt-course-block block-color-${ev.color || 'blue'}" onclick="window.viewScheduleClass(${ev.id})" title="${ev.name} (${ev.startTime} - ${ev.endTime})">
              <div class="tt-cb-name">${ev.name}</div>
              <div class="tt-cb-meta">
                <span class="tt-cb-time">${ev.startTime}-${ev.endTime}</span>
                ${ev.room ? `<span>• ${ev.room}</span>` : ''}
              </div>
            </div>
          `;
        });
        html += '</div>';
      });
    });

    timetableGridEl.innerHTML = html;
  }

  // Delete / View Event
  window.viewScheduleClass = function (id) {
    const ev = scheduleEvents.find((x) => x.id === id);
    if (!ev) return;

    const dayNames = ev.days.map((k) => (DAYS.find((d) => d.key === k) || {}).label).join('، ');
    let msg = 'تفاصيل المحاضرة:\n';
    msg += 'المساق: ' + ev.name + '\n';
    msg += 'الأيام: ' + dayNames + '\n';
    msg += 'الوقت: ' + ev.startTime + ' إلى ' + ev.endTime + '\n';
    if (ev.room) msg += 'القاعة: ' + ev.room + '\n';
    if (ev.instructor) msg += 'المدرس: ' + ev.instructor + '\n';
    msg += '\nهل ترغب في حذف هذه المحاضرة من الجدول؟';

    if (confirm(msg)) {
      scheduleEvents = scheduleEvents.filter((x) => x.id !== id);
      saveSchedule();
      renderTimetable();
    }
  };

  function clearSchedule() {
    if (scheduleEvents.length === 0) return;
    if (confirm('هل أنت متأكد من مسح الجدول الدراسي بالكامل؟')) {
      scheduleEvents = [];
      saveSchedule();
      renderTimetable();
    }
  }

  // Export as Image (Client-side HTML5 Canvas / SVG generator)
  function exportScheduleAsImage() {
    const container = document.getElementById('timetableWrapper');
    if (!container) return;

    // Use built-in window.print or generate canvas image
    window.print();
  }

  // Events
  function initEvents() {
    if (openAddModalBtn) openAddModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (saveClassBtn) saveClassBtn.addEventListener('click', handleAddClass);
    if (clearScheduleBtn) clearScheduleBtn.addEventListener('click', clearSchedule);
    if (printScheduleBtn) printScheduleBtn.addEventListener('click', () => window.print());
    if (exportImageBtn) exportImageBtn.addEventListener('click', exportScheduleAsImage);

    // Close on backdrop click
    if (addClassModalEl) {
      addClassModalEl.addEventListener('click', function (e) {
        if (e.target === addClassModalEl) closeModal();
      });
    }
  }

  // Init
  function init() {
    initCourseSelect();
    initTimeSelects();
    initColors();
    initDayPatterns();
    initEvents();
    loadSchedule();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
