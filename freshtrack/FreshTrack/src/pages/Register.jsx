
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || "Registration failed");
      }

      setMessage(result);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.message || "Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <main className="register-layout">

        {/* LEFT VISUAL PANEL */}
        <section className="register-visual-panel">
          <Link to="/" className="register-brand">
            <span>🌱</span>
            FreshTrack
          </Link>

          <div className="register-visual-copy">
            <span className="register-small-label">
              JOIN THE FRESHTRACK COMMUNITY
            </span>

            <h1>
              Start Your
              <br />
              Fresh Journey!
            </h1>

            <p>
              Make smarter food choices, save your groceries
              and help build a world with less food waste.
            </p>
          </div>

          <div className="register-food-art">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
              alt="Fresh green vegetables"
            />

            <div className="register-floating-card">
              <span>🌿</span>
              <div>
                <strong>Choose Fresh</strong>
                <small>Reduce Food Waste</small>
              </div>
            </div>

            <span className="register-decoration decoration-one">✿</span>
            <span className="register-decoration decoration-two">✦</span>
          </div>

          <div className="register-visual-bottom">
            <h2>
              Grow Good Habits.
              <br />
              Create Better Impact.
            </h2>

            <p>One small step can create a greener tomorrow.</p>
          </div>
        </section>

        {/* RIGHT REGISTER PANEL */}
        <section className="register-form-panel">
          <div className="register-form-heading">
            <span className="register-welcome-icon">🌱</span>

            <span className="register-top-label">
              CREATE YOUR ACCOUNT
            </span>

            <h2>Join FreshTrack</h2>

            <p>
              Create your account and start your
              smarter pantry journey.
            </p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>

            <label htmlFor="register-name">
              Full Name
            </label>

            <div className="register-input-wrap">
              <span className="register-input-icon">♙</span>

              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <label htmlFor="register-email">
              Email Address
            </label>

            <div className="register-input-wrap">
              <span className="register-input-icon">✉</span>

              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <label htmlFor="register-password">
              Password
            </label>

            <div className="register-input-wrap">
              <span className="register-input-icon">🔒</span>

              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label htmlFor="register-confirm-password">
              Confirm Password
            </label>

            <div className="register-input-wrap">
              <span className="register-input-icon">🔐</span>

              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

            {message && (
              <p className="register-message" role="status">
                {message}
              </p>
            )}

            <div className="register-divider">
              <span />
              <small>START YOUR FRESH JOURNEY</small>
              <span />
            </div>

            <p className="register-login-text">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </form>

          <div className="register-security-note">
            <span>🛡️</span>

            <p>
              Join us in building a smarter and more
              sustainable food management community.
            </p>
          </div>

          <p className="register-copyright">
            © 2026 FreshTrack. All rights reserved.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Register;
