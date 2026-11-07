// ============================================================
// SkillAnalyzer.jsx
// Location: src/pages/SkillAnalyzer.jsx
//
// This page has the main form where the user:
//   1. Enters their name
//   2. Selects User Type (Student / Employee)
//   3. Selects Target Role
//   4. Checks off the skills they already know
//
// On Submit, it calculates the skill gap and goes to Result page.
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// -------------------------------------------------------
// SKILL DATA (hardcoded — no database needed)
// This object maps each role to its required skills.
// -------------------------------------------------------
const requiredSkillsData = {
  'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  'Backend Developer': ['Python', 'SQL', 'Node.js', 'Git'],
  'Data Analyst': ['Python', 'SQL', 'Excel', 'Data Visualization'],
};

// -------------------------------------------------------
// RECOMMENDATIONS (hardcoded per role)
// Shown on the Result page.
// -------------------------------------------------------
const recommendationsData = {
  'Frontend Developer': [
    '📚 Learn HTML & CSS basics from freeCodeCamp',
    '⚛️  Study React.js with the official React docs',
    '🔧 Practice JavaScript on LeetCode (Easy level)',
    '🐙 Create a GitHub account and push projects',
    '🌐 Build 2 frontend projects: Portfolio + To-Do App',
  ],
  'Backend Developer': [
    '🐍 Start Python with "Automate the Boring Stuff" (free book)',
    '🗄️  Learn SQL basics on w3schools.com',
    '🟢 Take a Node.js crash course on YouTube',
    '🔧 Practice REST API building with Express.js',
    '📦 Build a simple CRUD backend project',
  ],
  'Data Analyst': [
    '🐍 Learn Python (Pandas, NumPy) for data work',
    '🗄️  Master SQL queries on SQLZoo.net',
    '📊 Use Excel or Google Sheets for basic data analysis',
    '📈 Learn Data Visualization with Matplotlib or Tableau',
    '💼 Work on a Kaggle beginner dataset project',
  ],
};

// All skills shown as checkboxes in the form
const allSkills = ['HTML', 'CSS', 'JavaScript', 'React', 'SQL', 'Python', 'Git', 'Node.js', 'Excel', 'Data Visualization'];

function SkillAnalyzer() {
  const navigate = useNavigate();

  // ---- Form State ----
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('Student');
  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [selectedSkills, setSelectedSkills] = useState([]); // checkboxes
  const [error, setError] = useState('');

  // This runs when the user checks/unchecks a skill checkbox
  function handleSkillToggle(skill) {
    if (selectedSkills.includes(skill)) {
      // Remove skill if already selected
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      // Add skill if not yet selected
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  // This runs when the Analyze button is clicked
  function handleAnalyze() {
    // Validation: name must be filled
    if (name.trim() === '') {
      setError('⚠️ Please enter your name.');
      return;
    }

    setError('');

    // Get the required skills for the selected role
    const required = requiredSkillsData[targetRole];

    // Find skills the user already has (intersection)
    const known = selectedSkills.filter((skill) => required.includes(skill));

    // Find skills the user is missing
    const missing = required.filter((skill) => !selectedSkills.includes(skill));

    // Calculate skill gap percentage
    // Formula: (Missing Skills / Total Required Skills) × 100
    const gapPercentage = Math.round((missing.length / required.length) * 100);

    // Pack all results into one object and pass to Result page via navigation state
    const result = {
      name: name.trim(),
      userType,
      targetRole,
      knownSkills: known,
      missingSkills: missing,
      gapPercentage,
      requiredSkills: required,
      recommendations: recommendationsData[targetRole],
    };

    // Navigate to result page and send the result data along
    navigate('/result', { state: result });
  }

  return (
    <div>
      <Navbar />

      <div className="analyzer-page">
        {/* Page Header */}
        <div className="page-header">
          <h1>🔍 Skill Gap Analyzer</h1>
          <p>Fill in the form below to analyze your skill gap</p>
        </div>

        <div className="form-card">

          {/* ---- Name Input ---- */}
          <div className="form-group">
            <label htmlFor="name">Your Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Madhuri Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* ---- User Type Select ---- */}
          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Student">🎓 Student</option>
              <option value="Employee">💼 Employee</option>
            </select>
          </div>

          {/* ---- Target Role Select ---- */}
          <div className="form-group">
            <label htmlFor="targetRole">Target Role</label>
            <select
              id="targetRole"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              <option value="Frontend Developer">🌐 Frontend Developer</option>
              <option value="Backend Developer">⚙️  Backend Developer</option>
              <option value="Data Analyst">📊 Data Analyst</option>
            </select>
          </div>

          {/* ---- Skills Checkboxes ---- */}
          <p className="form-section-title">Select Skills You Already Know</p>

          <div className="skills-grid">
            {allSkills.map((skill) => {
              const isChecked = selectedSkills.includes(skill);
              return (
                <label
                  key={skill}
                  className={`skill-checkbox ${isChecked ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSkillToggle(skill)}
                  />
                  <span>{skill}</span>
                </label>
              );
            })}
          </div>

          {/* Error message */}
          {error && (
            <p style={{ color: '#dc2626', fontSize: '0.88rem', marginBottom: '14px' }}>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button className="btn-primary" onClick={handleAnalyze}>
            🔍 Analyze My Skill Gap
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillAnalyzer;
