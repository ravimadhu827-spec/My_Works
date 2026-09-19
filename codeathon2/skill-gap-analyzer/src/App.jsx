// ============================================================
// App.jsx
// Location: src/App.jsx
//
// This is the ROOT component of our React app.
// It sets up React Router so each URL path shows
// the correct page component.
//
// Routes:
//   /            → Login page
//   /dashboard   → Dashboard page
//   /analyzer    → Skill Analyzer form page
//   /result      → Result page
// ============================================================

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all page components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SkillAnalyzer from './pages/SkillAnalyzer';
import Result from './pages/Result';

function App() {
  return (
    // BrowserRouter enables navigation between pages
    <BrowserRouter>
      <Routes>
        {/* Route 1: Login page — the first thing users see */}
        <Route path="/" element={<Login />} />

        {/* Route 2: Dashboard — shown after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route 3: Skill Analyzer form page */}
        <Route path="/analyzer" element={<SkillAnalyzer />} />

        {/* Route 4: Result page — shows the gap analysis */}
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
