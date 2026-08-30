import React from 'react';
import ReactDOM from 'react-dom/client';
import GpaCalculatorPage from '../pages/GpaCalculatorPage';
import '../styles/design-tokens.css';
import '../styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GpaCalculatorPage />
  </React.StrictMode>
);
