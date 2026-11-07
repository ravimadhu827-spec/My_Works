// ============================================================
// main.jsx
// Location: src/main.jsx
//
// This is the entry point of the React app.
// It mounts the <App /> component into the <div id="root">
// in index.html and imports our global CSS styles.
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';   // Our global CSS styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
