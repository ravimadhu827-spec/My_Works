
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || "Login failed");
      }

      setMessage(result);
    } catch (error) {
      setMessage(error.message || "Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="login-layout">

        {/* LEFT VISUAL SECTION */}
        <section className="login-visual-panel">
          <div className="login-brand">
            <span className="brand-icon">🌱</span>
            <span>FreshTrack</span>
          </div>

          <div className="login-visual-copy">
            <span className="login-small-label">
              FRESH FOOD • BETTER FUTURE
            </span>

            <h1>
              Welcome
              <br />
              Back!
            </h1>

            <p>
              Your smart pantry journey continues here.
              Manage your food, reduce waste and make
              every meal count.
            </p>
          </div>

          <div className="login-food-art">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOgWuyD0H5R3PUTBINVWcVoVINVj_cBa6pxyKSXWdxA&s=10"
              alt="Fresh vegetables"
            />

            <div className="floating-food-card">
              <span>🥬</span>
              <div>
                <strong>Eat Fresh</strong>
                <small>Live Better</small>
              </div>
            </div>

            <span className="login-decoration decoration-one">✿</span>
            <span className="login-decoration decoration-two">✦</span>
          </div>

          <div className="login-visual-bottom">
            <h2>Good Food. Less Waste.</h2>
            <p>Small steps create a better tomorrow.</p>
          </div>
        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="login-form-panel">
          <div className="login-form-heading">
            <span className="login-welcome-icon">👋</span>
            <span className="form-top-label">WELCOME BACK</span>

            <h2>Login to Your Account</h2>

            <p>
              Enter your details below to continue
              your FreshTrack journey.
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>

            <label htmlFor="login-email">
              Email Address
            </label>

            <div className="login-input-wrap">
              <span className="login-input-icon">✉</span>

              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <label htmlFor="login-password">
              Password
            </label>

            <div className="login-input-wrap">
              <span className="login-input-icon">🔒</span>

              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="login-forgot"
                onClick={() =>
                  setMessage(
                    "Please contact your administrator to reset your password."
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to FreshTrack →"}
            </button>

            {message && (
              <p className="login-message" role="status">
                {message}
              </p>
            )}

            <div className="login-divider">
              <span />
              <small>OR</small>
              <span />
            </div>

            <p className="login-register-text">
              Don't have an account?{" "}
              <Link to="/register">Create Account</Link>
            </p>
          </form>

          <div className="login-security-note">
            <span>🛡️</span>
            <p>
              Your journey towards reducing food waste
              starts with one simple step.
            </p>
          </div>

          <p className="login-copyright">
            © 2026 FreshTrack. All rights reserved.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
