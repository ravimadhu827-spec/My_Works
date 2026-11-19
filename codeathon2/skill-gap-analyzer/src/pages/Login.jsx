import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    navigate('/dashboard');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleLogin();
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">🎯</div>
          <h1>Skill Gap Analyzer</h1>
          <p>Discover your skill gaps &amp; accelerate your career growth</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="error-text">⚠️ {error}</p>
        )}

        <button className="btn-primary" onClick={handleLogin} id="login-btn">
          Sign In →
        </button>

        <p className="login-note">
          Demo: enter any email &amp; password to continue
        </p>
      </div>
    </div>
  );
}

export default Login;
