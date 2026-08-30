import React from 'react';
import ReactDOM from 'react-dom/client';
import YearPage from '../pages/YearPage';
import '../styles/global.css';
import '../../themes.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <YearPage yearKey="secndYear" />
  </React.StrictMode>
);
