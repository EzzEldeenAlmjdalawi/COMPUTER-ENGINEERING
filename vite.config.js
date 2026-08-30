import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, join } from 'path';
import { readdirSync, copyFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Primary pages processed by Vite + React
const PRIMARY_PAGES = new Set([
  'index.html',
  'firstYear.html',
  'secndYear.html',
  'thirdYear.html',
  'fourthYear.html',
  'fifthYear.html',
  'university-requirements.html',
  'study-tools.html',
  'search.html',
  'gpa-calculator.html',
]);

// Custom plugin to guarantee 100% exact copy of every resource subpage, CSS, JS, image
function copyAllStaticLegacyFiles() {
  return {
    name: 'copy-all-legacy-files',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }

      const allFiles = readdirSync(__dirname);

      // Copy all sub-page HTML files
      const subHtmls = allFiles.filter(f => f.endsWith('.html') && !PRIMARY_PAGES.has(f));
      for (const file of subHtmls) {
        copyFileSync(join(__dirname, file), join(distDir, file));
      }

      // Copy legacy CSS, JS, Images
      const assetFiles = [
        'years.css',
        'themes.css',
        'theme-synced.css',
        'years.js',
        'index.css',
        'subjeces.css',
        'Com.png',
        'engineer.png',
        'eng.jpg',
      ];

      for (const asset of assetFiles) {
        const srcPath = join(__dirname, asset);
        if (existsSync(srcPath)) {
          copyFileSync(srcPath, join(distDir, asset));
        }
      }

      console.log(`[copy-all-legacy-files] Copied ${subHtmls.length} legacy HTML sub-pages + ${assetFiles.length} assets to dist/`);
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    copyAllStaticLegacyFiles(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index:                  resolve(__dirname, 'index.html'),
        firstYear:              resolve(__dirname, 'firstYear.html'),
        secndYear:              resolve(__dirname, 'secndYear.html'),
        thirdYear:              resolve(__dirname, 'thirdYear.html'),
        fourthYear:             resolve(__dirname, 'fourthYear.html'),
        fifthYear:              resolve(__dirname, 'fifthYear.html'),
        universityRequirements: resolve(__dirname, 'university-requirements.html'),
        studyTools:             resolve(__dirname, 'study-tools.html'),
        search:                 resolve(__dirname, 'search.html'),
        gpaCalculator:          resolve(__dirname, 'gpa-calculator.html'),
      },
    },
  },
});
