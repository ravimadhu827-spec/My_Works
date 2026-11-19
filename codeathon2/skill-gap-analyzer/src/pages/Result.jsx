// ============================================================
// Result.jsx
// Location: src/pages/Result.jsx
//
// This page shows the final analysis results:
//   - Skills the user already knows
//   - Skills the user is missing
//   - Skill Gap Percentage
//   - A visual progress bar
//   - Personalized recommendations
// ============================================================

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Result() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the data sent from SkillAnalyzer page

  // If user visits this page directly (no data), redirect to analyzer
  if (!location.state) {
    navigate('/analyzer');
    return null;
  }

  // Unpack the result data
  const {
    name,
    userType,
    targetRole,
    knownSkills,
    missingSkills,
    gapPercentage,
    recommendations,
  } = location.state;

  // -------------------------------------------------------
  // Decide the "color theme" of the result hero card
  // based on the skill gap percentage
  // -------------------------------------------------------
  function getHeroClass() {
    if (gapPercentage === 0) return 'good';     // 0% gap = green
    if (gapPercentage <= 50) return 'medium';   // up to 50% = orange
    return 'poor';                               // above 50% = red
  }

  // A short encouraging message based on gap %
  function getStatusMessage() {
    if (gapPercentage === 0) {
      return '🎉 Amazing! You have all the required skills for this role!';
    } else if (gapPercentage <= 25) {
      return '✅ Almost there! Just a few skills to go!';
    } else if (gapPercentage <= 50) {
      return '💪 Good progress! Keep learning and you\'ll get there!';
    } else if (gapPercentage <= 75) {
      return '📚 You are on your way! Focus on the missing skills.';
    } else {
      return '🚀 Great start! Time to begin your learning journey!';
    }
  }

  const heroClass = getHeroClass();

  return (
    <div>
      <Navbar />

      <div className="result-page">

        {/* User Info Banner */}
        <div className="user-info-card">
          <div className="user-info-item">
            <label>Name</label>
            <span>{name}</span>
          </div>
          <div className="user-info-item">
            <label>User Type</label>
            <span>{userType}</span>
          </div>
          <div className="user-info-item">
            <label>Target Role</label>
            <span>{targetRole}</span>
          </div>
        </div>

        {/* Hero Card: Big Skill Gap % */}
        <div className={`result-hero ${heroClass}`}>
          <h2>Your Skill Gap</h2>
          <div className="gap-percentage">{gapPercentage}%</div>
          <div className="status-msg">{getStatusMessage()}</div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Skills Acquired</span>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {knownSkills.length} of {knownSkills.length + missingSkills.length} required skills
            </span>
          </div>
          <div className="progress-bar-wrap">
            <div
              className={`progress-bar-fill ${heroClass}`}
              style={{ width: `${100 - gapPercentage}%` }}
            />
          </div>
        </div>

        {/* Known Skills & Missing Skills Cards */}
        <div className="result-cards">

          {/* Skills you KNOW */}
          <div className="result-card known">
            <h3>✅ Skills You Have</h3>
            <div className="skill-tags">
              {knownSkills.length > 0 ? (
                knownSkills.map((skill) => (
                  <span key={skill} className="tag green">{skill}</span>
                ))
              ) : (
                <span className="tag empty">None selected</span>
              )}
            </div>
          </div>

          {/* Skills that are MISSING */}
          <div className="result-card missing">
            <h3>❌ Skills You Need</h3>
            <div className="skill-tags">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill) => (
                  <span key={skill} className="tag red">{skill}</span>
                ))
              ) : (
                <span className="tag empty">None — You're all set! 🎉</span>
              )}
            </div>
          </div>

        </div>

        {/* Recommendations */}
        <div className="recommendations-card">
          <h3>💡 Recommendations for You</h3>
          <ul className="rec-list">
            {recommendations.map((rec, index) => (
              <li key={index}>
                <span className="rec-icon">➤</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div>
          <button className="btn-secondary" onClick={() => navigate('/analyzer')}>
            🔄 Analyze Again
          </button>
          <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
            🏠 Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default Result;
