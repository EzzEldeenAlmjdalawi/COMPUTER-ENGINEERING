import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../components/Navbar';
import '../styles/design-tokens.css';
import '../components/Navbar.css';
import '../components/SearchBar.css';

const navContainer = document.getElementById('navbar-root');
if (navContainer) {
  ReactDOM.createRoot(navContainer).render(
    <React.StrictMode>
      <Navbar activePage="studyTools" />
    </React.StrictMode>
  );
}
