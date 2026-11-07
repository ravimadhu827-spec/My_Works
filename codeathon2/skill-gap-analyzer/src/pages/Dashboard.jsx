// ============================================================
// Dashboard.jsx
// Location: src/pages/Dashboard.jsx
//
// This page appears after login.
// It shows a welcome message and two cards: Student & Employee.
// Clicking either card goes to the Skill Analyzer page.
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();

  // When a card is clicked, navigate to the analyzer page
  function goToAnalyzer() {
    navigate('/analyzer');
  }

  return (
    <div>
      {/* Top navigation bar */}
      <Navbar />

      <div className="dashboard-page">

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1>👋 Welcome to Skill Gap Analyzer</h1>
          <p>
            Discover the skills you need for your dream role. Select your user type,
            choose a target role, and instantly find out what skills you are missing —
            along with personalized recommendations to fill the gap.
          </p>
        </div>

        {/* User Type Cards */}
        <p className="section-title">Select Who You Are</p>

        <div className="cards-row">
          {/* Student Card */}
          <div className="user-card" onClick={goToAnalyzer}>
            <div className="user-card-icon">🎓</div>
            <h3>Student</h3>
            <p>
              Are you a student preparing for your first job?
              Analyze your current skills and see what you need to learn.
            </p>
          </div>

          {/* Employee Card */}
          <div className="user-card" onClick={goToAnalyzer}>
            <div className="user-card-icon">💼</div>
            <h3>Employee</h3>
            <p>
              Are you a working professional looking to switch roles or level up?
              Find your skill gaps and plan your upskilling journey.
            </p>
          </div>
        </div>

        {/* How it works section */}
        <div className="info-section">
          <h2>📌 How It Works</h2>
          <div className="info-steps">
            <div className="step-item">
              <div className="step-num">1</div>
              <p>Fill in your name, role, and current skills</p>
            </div>
            <div className="step-item">
              <div className="step-num">2</div>
              <p>We compare your skills to the required skill set</p>
            </div>
            <div className="step-item">
              <div className="step-num">3</div>
              <p>Get your Skill Gap % and learning recommendations</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
