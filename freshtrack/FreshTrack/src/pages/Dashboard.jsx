
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const API_URL = "http://localhost:8080/api/foods";

function getStatus(date) {
  if (!date) return "Unknown";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(date + "T00:00:00");

  if (Number.isNaN(expiry.getTime())) return "Unknown";

  const difference = Math.floor(
    (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (difference < 0) return "Expired";
  if (difference <= 3) return "Expiring Soon";

  return "Fresh";
}

function Dashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load pantry items.");
        }

        const data = await response.json();
        setFoodItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Backend connection failed.");
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  const items = foodItems.map((food) => ({
    ...food,
    status: getStatus(food.expiryDate),
  }));

  const total = items.length;
  const fresh = items.filter((item) => item.status === "Fresh").length;
  const expiring = items.filter(
    (item) => item.status === "Expiring Soon"
  ).length;
  const expired = items.filter(
    (item) => item.status === "Expired"
  ).length;

  const getEmoji = (category) => {
    const emojis = {
      Grains: "🌾",
      Dairy: "🥛",
      Vegetables: "🥦",
      Fruits: "🍎",
      Meat: "🍗",
      Other: "🍱",
    };

    return emojis[category] || "🍱";
  };

  return (
    <main className="dashboard-page">

      {/* PAGE HEADING */}
      <div className="dashboard-page-heading">
        <div>
          <span className="dashboard-eyebrow">
            YOUR PERSONAL PANTRY
          </span>
          <h1>Dashboard Overview</h1>
          <p>
            Keep track of your food, stay fresh and reduce waste.
          </p>
        </div>

        <Link to="/pantry" className="dashboard-add-button">
          + Add Food Item
        </Link>
      </div>

      {/* WELCOME BANNER */}
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <span className="dashboard-tag">
            🌱 FRESHTRACK DASHBOARD
          </span>

          <h2>
            Your Food,
            <br />
            Smarter.
          </h2>

          <p>
            Track your pantry, manage expiry dates and make
            every meal count. A smarter kitchen starts here.
          </p>

          <Link className="dashboard-cta" to="/pantry">
            Manage My Pantry →
          </Link>
        </div>

        <div className="welcome-illustration">
          <span>🥑</span>
          <div className="welcome-floating-note">
            <span>🌿</span>
            <div>
              <strong>Eat Fresh</strong>
              <small>Waste Less</small>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="dashboard-stats">

        <article className="dashboard-stat total-stat">
          <div className="stat-top">
            <span className="dashboard-icon green-icon">🧺</span>
            <span className="stat-label">INVENTORY</span>
          </div>

          <p>Total Food Items</p>
          <h2>{loading ? "—" : total}</h2>
          <small>Items in your pantry</small>
        </article>

        <article className="dashboard-stat fresh-stat">
          <div className="stat-top">
            <span className="dashboard-icon fresh-icon">🌿</span>
            <span className="stat-label">HEALTHY</span>
          </div>

          <p>Fresh Items</p>
          <h2>{loading ? "—" : fresh}</h2>
          <small>Ready to use</small>
        </article>

        <article className="dashboard-stat warning-stat">
          <div className="stat-top">
            <span className="dashboard-icon warning-icon">⏳</span>
            <span className="stat-label">ATTENTION</span>
          </div>

          <p>Expiring Soon</p>
          <h2>{loading ? "—" : expiring}</h2>
          <small>Check these items</small>
        </article>

        <article className="dashboard-stat expired-stat">
          <div className="stat-top">
            <span className="dashboard-icon expired-icon">⚠️</span>
            <span className="stat-label">ACTION NEEDED</span>
          </div>

          <p>Expired Items</p>
          <h2>{loading ? "—" : expired}</h2>
          <small>Review your pantry</small>
        </article>

      </section>

      {/* FOOD INVENTORY */}
      <section className="dashboard-food-section">

        <div className="dashboard-section-heading">
          <div>
            <span className="section-eyebrow">
              PANTRY ACTIVITY
            </span>
            <h2>Recently Added Food</h2>
            <p>A quick look at your pantry inventory.</p>
          </div>

          <Link to="/pantry">
            View All Items →
          </Link>
        </div>

        {loading && (
          <div className="dashboard-feedback">
            <span className="loading-spinner"></span>
            <p>Loading your pantry items...</p>
          </div>
        )}

        {!loading && error && (
          <div className="dashboard-feedback error-feedback">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="dashboard-empty">
            <span>🧺</span>
            <h3>Your pantry is waiting!</h3>
            <p>
              No food items found. Add your first food item
              to start managing your pantry.
            </p>
            <Link to="/pantry">Add Your First Item →</Link>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="dashboard-food-list">

            {items.map((item) => (
              <article
                className="dashboard-food-row"
                key={item.id}
              >
                <span className="dashboard-food-emoji">
                  {getEmoji(item.category)}
                </span>

                <div className="dashboard-food-info">
                  <h3>{item.name}</h3>
                  <p>
                    {item.category || "Other"} · {item.quantity}{" "}
                    {item.unit || "items"}
                  </p>
                </div>

                <div className="dashboard-expiry">
                  <small>Expiry Date</small>
                  <strong>
                    {item.expiryDate || "Not set"}
                  </strong>
                </div>

                <span
                  className={`dashboard-status ${item.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {item.status}
                </span>
              </article>
            ))}

          </div>
        )}
      </section>

      {/* QUICK TIP */}
      <section className="dashboard-tip">
        <span className="tip-icon">💡</span>

        <div>
          <span className="tip-label">SMART PANTRY TIP</span>
          <h3>Use Your Food Before It Expires</h3>
          <p>
            Always use food items with the nearest expiry date first.
            This simple habit helps reduce household food waste.
          </p>
        </div>
      </section>

      {/* BOTTOM QUICK LINKS */}
      <section className="dashboard-quick-links">
        <Link to="/pantry" className="quick-link-card">
          <span>🧺</span>
          <div>
            <strong>My Pantry</strong>
            <small>Manage your food items</small>
          </div>
          <span className="quick-arrow">→</span>
        </Link>

        <Link to="/donations" className="quick-link-card">
          <span>💚</span>
          <div>
            <strong>Food Donations</strong>
            <small>Share food with others</small>
          </div>
          <span className="quick-arrow">→</span>
        </Link>
      </section>

    </main>
  );
}

export default Dashboard;
