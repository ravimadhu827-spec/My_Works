import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-icon">🎯</span>
        Skill Gap Analyzer
      </div>
      <div className="navbar-links">
        <button onClick={() => navigate('/dashboard')}>🏠 Home</button>
        <button onClick={() => navigate('/')}>🚪 Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
