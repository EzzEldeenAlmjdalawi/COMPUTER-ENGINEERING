// Official IUG Computer Engineering GPA Plan Data extracted directly from gpa_calculator.xlsx

export const GPA_PLAN_SEMESTERS = [
  {
    id: 'y1_s1',
    yearTitle: 'المستوى الأول',
    semesterTitle: 'الفصل الأول',
    totalHours: 16,
    courses: [
      { id: 'y1_s1_1', name: 'اللغة العربية (النحو والصرف)', hours: 2 },
      { id: 'y1_s1_2', name: 'مقدمة في الهندسة', hours: 1 },
      { id: 'y1_s1_3', name: 'منهجية بحث علمي', hours: 1 },
      { id: 'y1_s1_4', name: 'رسم هندسي', hours: 2 },
      { id: 'y1_s1_5', name: 'تفاضل وتكامل (أ)', hours: 3 },
      { id: 'y1_s1_6', name: 'فيزياء عامة عملية (أ)', hours: 1 },
      { id: 'y1_s1_7', name: 'فيزياء عامة (أ)', hours: 3 },
      { id: 'y1_s1_8', name: 'قرآن كريم (1)', hours: 1 },
      { id: 'y1_s1_9', name: 'دراسات في الفقه', hours: 2 },
    ],
  },
  {
    id: 'y1_s2',
    yearTitle: 'المستوى الأول',
    semesterTitle: 'الفصل الثاني',
    totalHours: 18,
    courses: [
      { id: 'y1_s2_1', name: 'كيمياء عامة', hours: 3 },
      { id: 'y1_s2_2', name: 'تقنية الورش', hours: 1 },
      { id: 'y1_s2_3', name: 'مقدمة في الحاسبات', hours: 2 },
      { id: 'y1_s2_4', name: 'لغة إنجليزية تقنية', hours: 3 },
      { id: 'y1_s2_5', name: 'دراسات في السيرة', hours: 2 },
      { id: 'y1_s2_6', name: 'تفاضل وتكامل (ب)', hours: 4 },
      { id: 'y1_s2_7', name: 'فيزياء عامة (ب)', hours: 3 },
    ],
  },
  {
    id: 'y2_s1',
    yearTitle: 'المستوى الثاني',
    semesterTitle: 'الفصل الأول',
    totalHours: 17,
    courses: [
      { id: 'y2_s1_1', name: 'برمجة حاسوب (1)', hours: 4 },
      { id: 'y2_s1_2', name: 'تصميم رقمي تجميعي', hours: 4 },
      { id: 'y2_s1_3', name: 'دوائر كهربائية (1) (علمي)', hours: 1 },
      { id: 'y2_s1_4', name: 'دوائر كهربائية (1) (اتصالات وتحكم)', hours: 3 },
      { id: 'y2_s1_5', name: 'متطلب جامعة اختياري', hours: 2 },
      { id: 'y2_s1_6', name: 'قرآن كريم (2)', hours: 1 },
      { id: 'y2_s1_7', name: 'دراسات في القران وعلومه', hours: 2 },
    ],
  },
  {
    id: 'y2_s2',
    yearTitle: 'المستوى الثاني',
    semesterTitle: 'الفصل الثاني',
    totalHours: 18,
    courses: [
      { id: 'y2_s2_1', name: 'برمجة حاسوب (2)', hours: 4 },
      { id: 'y2_s2_2', name: 'تصميم رقمي تتابعي', hours: 4 },
      { id: 'y2_s2_3', name: 'الكترونيات (1) عملي', hours: 1 },
      { id: 'y2_s2_4', name: 'الكترونيات (1)', hours: 3 },
      { id: 'y2_s2_5', name: 'معادلات تفاضلية عادية', hours: 3 },
      { id: 'y2_s2_6', name: 'جبر خطي', hours: 3 },
    ],
  },
  {
    id: 'y3_s1',
    yearTitle: 'المستوى الثالث',
    semesterTitle: 'الفصل الأول',
    totalHours: 16,
    courses: [
      { id: 'y3_s1_1', name: 'رياضيات متقطعة', hours: 4 },
      { id: 'y3_s1_2', name: 'تراكيب بيانات وخوازميات', hours: 4 },
      { id: 'y3_s1_3', name: 'إشارات وأنظمة خطية (عملي)', hours: 1 },
      { id: 'y3_s1_4', name: 'إشارات وأنظمة خطية', hours: 3 },
      { id: 'y3_s1_5', name: 'نظرية احتمالات وإحصاء', hours: 3 },
      { id: 'y3_s1_6', name: 'قرآن كريم (3)', hours: 1 },
    ],
  },
  {
    id: 'y3_s2',
    yearTitle: 'المستوى الثالث',
    semesterTitle: 'الفصل الثاني',
    totalHours: 18,
    courses: [
      { id: 'y3_s2_1', name: 'عمارة حاسبات', hours: 4 },
      { id: 'y3_s2_2', name: 'نظم قواعد بيانات', hours: 4 },
      { id: 'y3_s2_3', name: 'الكترونيات رقمية (عملي)', hours: 1 },
      { id: 'y3_s2_4', name: 'أنظمة التحكم الخطية (عملي)', hours: 1 },
      { id: 'y3_s2_5', name: 'الكترونيات رقمية', hours: 3 },
      { id: 'y3_s2_6', name: 'أنظمة التحكم الخطية', hours: 3 },
      { id: 'y3_s2_7', name: 'النظم الإسلامية', hours: 2 },
    ],
  },
  {
    id: 'y4_s1',
    yearTitle: 'المستوى الرابع',
    semesterTitle: 'الفصل الأول',
    totalHours: 16,
    courses: [
      { id: 'y4_s1_1', name: 'دراسات في العقيدة', hours: 3 },
      { id: 'y4_s1_2', name: 'نظم تشغيل', hours: 4 },
      { id: 'y4_s1_3', name: 'اتصالات بيانات', hours: 4 },
      { id: 'y4_s1_4', name: 'لغة تجميع', hours: 4 },
      { id: 'y4_s1_5', name: 'قرآن كريم (4)', hours: 1 },
    ],
  },
  {
    id: 'y4_s2',
    yearTitle: 'المستوى الرابع',
    semesterTitle: 'الفصل الثاني',
    totalHours: 16,
    courses: [
      { id: 'y4_s2_1', name: 'شبكات حاسوب', hours: 4 },
      { id: 'y4_s2_2', name: 'نظم مغموسة', hours: 4 },
      { id: 'y4_s2_3', name: 'لغات وصف معدات الحاسوب', hours: 4 },
      { id: 'y4_s2_4', name: 'هندسة برمجيات', hours: 4 },
    ],
  },
  {
    id: 'y5_s1',
    yearTitle: 'المستوى الخامس',
    semesterTitle: 'الفصل الأول',
    totalHours: 15,
    courses: [
      { id: 'y5_s1_1', name: 'حاضر العالم الإسلامي', hours: 2 },
      { id: 'y5_s1_2', name: 'مشروع تخرج (1)', hours: 3 },
      { id: 'y5_s1_3', name: 'مساق اختياري (1)', hours: 4 },
      { id: 'y5_s1_4', name: 'مساق اختياري (2)', hours: 4 },
      { id: 'y5_s1_5', name: 'دراسات فلسطينية', hours: 2 },
    ],
  },
  {
    id: 'y5_s2',
    yearTitle: 'المستوى الخامس',
    semesterTitle: 'الفصل الثاني',
    totalHours: 13,
    courses: [
      { id: 'y5_s2_1', name: 'مشروع تخرج (2)', hours: 3 },
      { id: 'y5_s2_2', name: 'دراسات في الحديث الشريف', hours: 2 },
      { id: 'y5_s2_3', name: 'مساق اختياري (3)', hours: 4 },
      { id: 'y5_s2_4', name: 'مساق اختياري (4)', hours: 4 },
    ],
  },
];

export const TOTAL_PLAN_HOURS = GPA_PLAN_SEMESTERS.reduce((acc, sem) => acc + sem.totalHours, 0); // 167 Hours

export function getGpaEvaluation(gpa) {
  if (gpa >= 90) return { label: 'ممتاز مع مرتبة الشرف 🏆', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
  if (gpa >= 85) return { label: 'ممتاز ⭐', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
  if (gpa >= 75) return { label: 'جيد جداً 👍', color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.12)' };
  if (gpa >= 65) return { label: 'جيد 📘', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' };
  if (gpa >= 60) return { label: 'مقبول ⚠️', color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)' };
  return { label: 'ضعيف / تحذير أكاديمي ❌', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' };
}
