
import { useEffect, useState } from "react";
import "./Donations.css";

const API_URL = "http://localhost:8080/api/donations";

function Donations() {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    location: "",
    message: "",
  });

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  const loadDonations = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load donations");
      }

      const data = await response.json();
      setDonations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Donation loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

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
        throw new Error("Donation could not be submitted");
      }

      setNotice("Your donation has been submitted successfully!");

      setFormData({
        foodName: "",
        quantity: "",
        expiryDate: "",
        location: "",
        message: "",
      });

      await loadDonations();
    } catch (error) {
      console.error("Donation submission error:", error);
      setNotice(
        "Unable to submit donation. Please check your backend connection."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const food = (donation.foodName || "").toLowerCase();
    const location = (donation.location || "").toLowerCase();
    const searchText = search.toLowerCase();

    return (
      food.includes(searchText) ||
      location.includes(searchText)
    );
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return "Date unavailable";

    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const difference = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) return "Expired";
    if (difference === 0) return "Expires today";
    if (difference <= 3) return `Expires in ${difference} day(s)`;

    return "Fresh";
  };

  return (
    <main className="donations-page">
      <section className="donation-hero">
        <div className="donation-hero-content">
          <span className="donation-eyebrow">
            FRESHTRACK COMMUNITY
          </span>

          <h1>
            Share Food.
            <br />
            <span>Spread Kindness.</span>
          </h1>

          <p>
            Have extra food at home? Share safe, unexpired food
            with people who need it. Every donation can make a
            meaningful difference.
          </p>

          <a href="#donate-form" className="donation-hero-btn">
            Donate Food <span>→</span>
          </a>
        </div>

        <div className="donation-hero-art" aria-hidden="true">
          <div className="donation-art-circle">
            <span className="donation-art-leaf">✳</span>
            <img src="https://cdn-icons-png.flaticon.com/128/11009/11009786.png" alt="food" />
            {/* <span className="donation-art-bowl">🥗</span> */}
          </div>
          <div className="donation-art-note">
            <span>♥</span>
            Good food deserves
            <br />
            a good purpose.
          </div>
        </div>
      </section>

      <section className="donation-impact">
        <div className="impact-item">
          <span className="impact-icon">♻</span>
          <div>
            <h3>Reduce Waste</h3>
            <p>Give extra food a purpose</p>
          </div>
        </div>

        <div className="impact-item">
          <span className="impact-icon">♡</span>
          <div>
            <h3>Help Others</h3>
            <p>Share with your community</p>
          </div>
        </div>

        <div className="impact-item">
          <span className="impact-icon">✓</span>
          <div>
            <h3>Donate Safely</h3>
            <p>Check food expiry dates</p>
          </div>
        </div>
      </section>

      <section className="donation-main">
        <div className="donation-form-section" id="donate-form">
          <div className="donation-section-heading">
            <span className="donation-label">MAKE A DIFFERENCE</span>
            <h2>Donate food</h2>
            <p>
              Fill in the details below to share your available food.
            </p>
          </div>

          <form className="donation-form" onSubmit={handleSubmit}>
            <div className="donation-field">
              <label htmlFor="foodName">Food name *</label>
              <input
                id="foodName"
                name="foodName"
                type="text"
                placeholder="e.g. Fresh vegetables"
                value={formData.foodName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="donation-form-row">
              <div className="donation-field">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  placeholder="e.g. 2 kg"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="donation-field">
                <label htmlFor="expiryDate">Expiry date *</label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  min={new Date().toLocaleDateString("en-CA")}
                  required
                />
              </div>
            </div>

            <div className="donation-field">
              <label htmlFor="location">Pickup location *</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter your area or address"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="donation-field">
              <label htmlFor="message">
                Additional details <span>(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Add storage details or pickup instructions..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="donation-safety-note">
              <span>ⓘ</span>
              Please donate only safe, properly stored food
              that has not expired.
            </div>

            {notice && (
              <p
                className={`donation-notice ${
                  notice.startsWith("Your")
                    ? "donation-success"
                    : "donation-error"
                }`}
                role="status"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              className="donation-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Donation"}
              {!submitting && <span>→</span>}
            </button>
          </form>
        </div>

        <div className="donation-list-section">
          <div className="donation-list-heading">
            <div>
              <span className="donation-label">COMMUNITY SHARING</span>
              <h2>Available donations</h2>
              <p>Explore food shared by your community.</p>
            </div>

            <span className="donation-count">
              {donations.length} shared
            </span>
          </div>

          <div className="donation-search">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search food or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search donations"
            />
          </div>

          {loading ? (
            <div className="donation-empty">
              <span className="donation-empty-icon">◌</span>
              <h3>Loading donations...</h3>
              <p>Please wait while we fetch the available food.</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="donation-empty">
              <span className="donation-empty-icon">♧</span>
              <h3>No donations found</h3>
              <p>
                {search
                  ? "Try another food name or location."
                  : "Be the first to share food with your community."}
              </p>
            </div>
          ) : (
            <div className="donation-cards">
              {filteredDonations.map((donation, index) => {
                const status = getExpiryStatus(donation.expiryDate);
                const isExpired = status === "Expired";

                return (
                  <article
                    className="donation-card"
                    key={donation.id ?? `${donation.foodName}-${index}`}
                  >
                    <div className="donation-card-top">
                      <div className="donation-food-icon">
                        {["🥬", "🥕", "🍎", "🥫"][index % 4]}
                      </div>

                      <span
                        className={`donation-expiry ${
                          isExpired
                            ? "expiry-danger"
                            : status === "Fresh"
                            ? "expiry-fresh"
                            : "expiry-soon"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <h3>{donation.foodName}</h3>

                    <div className="donation-card-detail">
                      <span>Quantity</span>
                      <strong>{donation.quantity}</strong>
                    </div>

                    <div className="donation-card-detail">
                      <span>Expiry date</span>
                      <strong>
                        {donation.expiryDate || "Not specified"}
                      </strong>
                    </div>

                    <div className="donation-location">
                      <span>⌖</span>
                      <p>{donation.location || "Location not specified"}</p>
                    </div>

                    {donation.message && (
                      <p className="donation-card-message">
                        {donation.message}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="donation-bottom-banner">
        <div>
          <span className="donation-label">SMALL ACTION, BIG IMPACT</span>
          <h2>Good food. Less waste. A kinder world.</h2>
          <p>
            Together, we can make every meal count and build a
            community that cares.
          </p>
        </div>
        <span className="donation-banner-icon">🌱</span>
      </section>
    </main>
  );
}

export default Donations;
