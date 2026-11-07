
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pantry from "./pages/Pantry";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";

const foodImage =
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">🌿</span>
        Fresh<span className="logo-highlight">Track</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
        <NavLink to="/pantry" onClick={closeMenu}>My Pantry</NavLink>
        <NavLink to="/donations" onClick={closeMenu}>Donations</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </div>

      <div className="nav-actions">
        <Link to="/login" className="nav-login">Login</Link>
        <Link to="/register" className="nav-register">
          Get Started <span>↗</span>
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">🌿</span>
            Fresh<span className="logo-highlight">Track</span>
          </Link>
          <p>
            Make every meal count. Manage your pantry,
            reduce food waste and share goodness.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/pantry">My Pantry</Link>
        </div>

        <div className="footer-links">
          <h4>Get Involved</h4>
          <Link to="/donations">Donate Food</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/register">Create Account</Link>
        </div>

        <div className="footer-note">
          <span>🌍</span>
          <h4>A little care goes a long way.</h4>
          <p>Good food. Less waste. Better tomorrow.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 FreshTrack. All rights reserved.</span>
        <span>Made with 💚 for a better tomorrow.</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-content">
          <span className="eyebrow">
            <span className="eyebrow-dot"></span>
            SMARTER PANTRY · GREENER PLANET
          </span>

          <h1>
            Your Pantry,
            <br />
            <span>Smarter & Fresher.</span>
          </h1>

          <p className="hero-description">
            Take control of your kitchen. Track food freshness,
            manage your groceries and give extra food a second chance.
            Small changes can make a big difference.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="primary-button">
              Start Your Journey <span>↗</span>
            </Link>

            <Link to="/pantry" className="secondary-button">
              Explore My Pantry <span>→</span>
            </Link>
          </div>

          <div className="hero-trust">
            <div><span>✓</span> Easy food tracking</div>
            <div><span>✓</span> Expiry awareness</div>
            <div><span>✓</span> Meaningful donations</div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img src={foodImage} alt="Fresh healthy vegetables and food" />
            <div className="image-caption">
              <span>🥬</span>
              <div>
                <strong>Fresh choices, every day</strong>
                <small>Make your food count</small>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            <span className="float-icon">🌱</span>
            <div>
              <strong>Live Fresh</strong>
              <small>Waste less, enjoy more</small>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <span className="float-icon orange">♻️</span>
            <div>
              <strong>Give Food a Second Life</strong>
              <small>Share extra, spread kindness</small>
            </div>
          </div>

          <div className="decor-circle decor-one"></div>
          <div className="decor-circle decor-two"></div>
        </div>
      </section>

      {/* INTRODUCTION STRIP */}
      <section className="intro-strip">
        <div>
          <span className="intro-icon">🌿</span>
          <p>Thoughtful food management starts at home.</p>
        </div>
        <span className="intro-divider"></span>
        <p>Organise better. Waste less. Share more.</p>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-heading">
          <span className="section-tag">WHAT YOU CAN DO</span>
          <h2>Everything your pantry <span>needs.</span></h2>
          <p>
            Simple tools to make everyday food management
            easier, smarter and more meaningful.
          </p>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card card-green">
            <div className="feature-icon">🧺</div>
            <span className="feature-number">01</span>
            <h3>Manage Your Pantry</h3>
            <p>
              Keep your grocery items organised.
              Add, update and manage your food in one place.
            </p>
            <Link to="/pantry" className="feature-link">
              Explore Pantry <span>↗</span>
            </Link>
          </article>

          <article className="benefit-card card-orange">
            <div className="feature-icon">⏰</div>
            <span className="feature-number">02</span>
            <h3>Track Expiry Dates</h3>
            <p>
              Stay aware of food freshness and
              identify items that need attention.
            </p>
            <Link to="/dashboard" className="feature-link">
              View Dashboard <span>↗</span>
            </Link>
          </article>

          <article className="benefit-card card-mint">
            <div className="feature-icon">💚</div>
            <span className="feature-number">03</span>
            <h3>Share Through Donations</h3>
            <p>
              Give eligible extra food a second chance
              by sharing it with others.
            </p>
            <Link to="/donations" className="feature-link">
              Explore Donations <span>↗</span>
            </Link>
          </article>

          <article className="benefit-card card-lavender">
            <div className="feature-icon">📊</div>
            <span className="feature-number">04</span>
            <h3>Understand Your Pantry</h3>
            <p>
              View your food information and
              monitor your pantry in one place.
            </p>
            <Link to="/dashboard" className="feature-link">
              See Overview <span>↗</span>
            </Link>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-heading">
          <span className="section-tag">SIMPLE PROCESS</span>
          <h2>FreshTrack in <span>three steps.</span></h2>
          <p>Getting started with smarter food management is easy.</p>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">📝</div>
            <h3>Add Your Food</h3>
            <p>
              Add your grocery items, quantities and
              expiry dates to your pantry.
            </p>
          </article>

          <div className="step-connector">→</div>

          <article className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">🔎</div>
            <h3>Track Freshness</h3>
            <p>
              Check your food status and identify
              items that need to be used soon.
            </p>
          </article>

          <div className="step-connector">→</div>

          <article className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">🤝</div>
            <h3>Share & Reduce Waste</h3>
            <p>
              Manage eligible donations and help
              make food sharing meaningful.
            </p>
          </article>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="impact-section">
        <div className="impact-visual">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
            alt="Healthy fresh meal prepared with vegetables"
          />
          <div className="impact-image-label">
            <span>💚</span>
            Better habits begin in your kitchen.
          </div>
        </div>

        <div className="impact-content">
          <span className="section-tag">WHY FRESHTRACK?</span>
          <h2>Good food deserves <span>better care.</span></h2>
          <p>
            Food management is more than keeping groceries organised.
            It is about being mindful of what we buy, what we use
            and what we can share.
          </p>

          <div className="impact-points">
            <div><span>✓</span><p>Make food expiry easier to monitor.</p></div>
            <div><span>✓</span><p>Build better pantry organisation habits.</p></div>
            <div><span>✓</span><p>Encourage responsible food sharing.</p></div>
          </div>

          <Link to="/register" className="primary-button">
            Be Part of the Change <span>↗</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-decoration">🌿</div>
        <div className="cta-content">
          <span>YOUR SMARTER PANTRY STARTS HERE</span>
          <h2>Let's make every bite count.</h2>
          <p>
            Join FreshTrack and take your first step towards
            thoughtful food management.
          </p>
          <Link to="/register" className="cta-button">
            Create Your Account <span>↗</span>
          </Link>
        </div>
      </section>

    </main>
  );
}

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
        <Route path="/register" element={<PageLayout><Register /></PageLayout>} />
        <Route path="/dashboard" element={<PageLayout><Dashboard /></PageLayout>} />
        <Route path="/pantry" element={<PageLayout><Pantry /></PageLayout>} />
        <Route path="/donations" element={<PageLayout><Donations /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
