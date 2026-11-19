
import { useState } from "react";
import "./Contact.css";

const API_URL = "http://localhost:8080/api/contact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice("");
    setSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to send your message");
      }

      setNotice(
        "Your message has been sent successfully! Thank you for contacting FreshTrack."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setNotice(
        "Unable to send your message. Please check the backend connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            WE ARE HERE FOR YOU
          </span>

          <h1>
            Let's start a
            <br />
            <span>conversation.</span>
          </h1>

          <p>
            Have a question, an idea, or feedback about FreshTrack?
            We would love to hear from you. Together, let's make
            food management smarter and reduce food waste.
          </p>

          <a href="#contact-form" className="contact-hero-btn">
            Get in touch <span>→</span>
          </a>
        </div>

        <div className="contact-hero-art" aria-hidden="true">
          <div className="contact-art-circle">
            <span className="contact-art-leaf">✳</span>
            <span className="contact-art-icon">💌</span>
          </div>

          <div className="contact-art-note">
            <span>♥</span>
            Your voice matters.
            <br />
            Let's grow together.
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="contact-highlights">
        <article className="contact-highlight">
          <span className="contact-highlight-icon">✉</span>
          <div>
            <h3>Email Support</h3>
            <p>Send us your questions anytime.</p>
          </div>
        </article>

        <article className="contact-highlight">
          <span className="contact-highlight-icon">♡</span>
          <div>
            <h3>Friendly Support</h3>
            <p>We are happy to hear your feedback.</p>
          </div>
        </article>

        <article className="contact-highlight">
          <span className="contact-highlight-icon">🌱</span>
          <div>
            <h3>Better Together</h3>
            <p>Your ideas help us improve FreshTrack.</p>
          </div>
        </article>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main">

        <div className="contact-info">
          <span className="contact-label">
            CONTACT FRESHTRACK
          </span>

          <h2>
            We'd love to
            <br />
            hear from you.
          </h2>

          <p className="contact-info-description">
            Whether you need help using the platform or want to
            share a suggestion, send us a message using the form.
          </p>

          <div className="contact-info-card">
            <span className="contact-info-icon">✉</span>
            <div>
              <h3>Send a message</h3>
              <p>
                Fill out the contact form and tell us how we can help.
              </p>
            </div>
          </div>

          <div className="contact-info-card">
            <span className="contact-info-icon">♧</span>
            <div>
              <h3>Our mission</h3>
              <p>
                Smarter pantry management, less food waste,
                and a more caring community.
              </p>
            </div>
          </div>

          <div className="contact-quote">
            <span>“</span>
            Every small step towards reducing food waste
            creates a better tomorrow.
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section" id="contact-form">
          <div className="contact-form-heading">
            <span className="contact-label">
              SEND US A MESSAGE
            </span>

            <h2>How can we help?</h2>

            <p>
              Complete the form below. All fields marked * are required.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="contact-field">
              <label htmlFor="contact-name">Your name *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email address *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject">Subject *</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="What would you like to discuss?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your message *</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Write your message here..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-privacy-note">
              <span>ⓘ</span>
              Please do not include passwords or other sensitive
              personal information in your message.
            </div>

            {notice && (
              <p
                className={`contact-notice ${
                  notice.startsWith("Your message")
                    ? "contact-success"
                    : "contact-error"
                }`}
                role="status"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Sending message..." : "Send message"}
              {!submitting && <span>→</span>}
            </button>

            <p className="contact-form-footer">
              Thank you for being part of the FreshTrack community.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="contact-bottom-banner">
        <div>
          <span className="contact-label">
            OUR SHARED PURPOSE
          </span>

          <h2>Less waste. More care. A greener future.</h2>

          <p>
            Every conversation brings us one step closer to a
            world where good food never goes to waste.
          </p>
        </div>

        <span className="contact-banner-icon" aria-hidden="true">
          🌿
        </span>
      </section>

    </main>
  );
}

export default Contact;
