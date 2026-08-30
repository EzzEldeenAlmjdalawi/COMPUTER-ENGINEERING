# Platform Upgrade Tracking

## Phase 1 (Completed & Verified)
- [x] Inventory & Preservation (147 files)
- [x] Vite Multi-Page Architecture (MPA)
- [x] Design Tokens (Deep Slate Blue #1B2A4A & Electric Amber #F59E0B)
- [x] Unified RTL Navbar & Deep-linking
- [x] Global Search with Bilingual Filtering

## Phase 2 (Completed & Verified)
- [x] **0. Bug Fix (Lab Badge Logic)**:
  - Corrected condition: lab badge ONLY triggers when course name contains "عملي", "Lab", or "Practical".
  - Verified across `SubjectAccordion.jsx`, `SearchBar.jsx`, and `SearchPage.jsx`.

- [x] **1. Visual & Branding Polish**:
  - Custom SVG Chip/Circuit Logo component (`Logo.jsx`) matching established blueprint palette.
  - Custom vector illustrations (`Illustrations.jsx`) for hero and empty states.
  - Collapsible Sidebar navigation (`Sidebar.jsx` & `Sidebar.css`) for both desktop and mobile.
  - Universal Footer (`Footer.jsx` & `Footer.css`) with phone (`0595346617`), email (`mnmaassddll@gmail.com`), Telegram links, and developer credits.

- [x] **2. Study Tools (localStorage-based)**:
  - Favorites/Bookmarks (`FavoritesModal.jsx`): Star subjects directly from cards and access them via global drawer.
  - Study Progress Checklist (`ProgressChecklistModal.jsx`): Track chapters, lectures, slides, problem sets, and lab manuals per subject.
  - Pomodoro Study Timer (`PomodoroWidget.jsx`): Floating widget with 25min / 5min / 15min modes, synth audio chime chime, and minimized pill state.

- [x] **3. GPA Calculator (Official 0–100 System)**:
  - Full Course Plan (`src/data/gpaPlanData.js`) with exact 10 semesters / 167 credit hours from `gpa_calculator.xlsx`.
  - Mode A: Full Plan Calculator (live calculation per keystroke, per-semester GPA, cumulative GPA, evaluation rating).
  - Mode B: What-If Next Semester Calculator (live projected cumulative GPA, difference indicator, auto-sync from Plan).
  - Mode C: Classwork-to-Grade Converter (partial scores converted to 100 with one-click export to What-If).
  - Built as real physical page `gpa-calculator.html` in Vite MPA.
  - Verified build output: 147 original source files + 129 legacy sub-pages intact.
