
import { useState, useEffect } from 'react';
import './Pantry.css';

const API_URL = 'http://localhost:8080/api/foods';

function Pantry() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('Grains');

  const loadFoods = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Unable to load pantry items.');
      }

      const data = await response.json();
      setFoods(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Backend connection failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setQuantity('');
    setUnit('kg');
    setExpiryDate('');
    setCategory('Grains');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !quantity || Number(quantity) <= 0 || !expiryDate) {
      alert('Please enter valid food details.');
      return;
    }

    const food = {
      name: name.trim(),
      category,
      quantity: Number(quantity),
      expiryDate,
    };

    // Backend Food entity-la unit field irundha mattum
    // keezhe irukkura unit line-ai uncomment pannu:
    // food.unit = unit;

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });

      if (!response.ok) {
        throw new Error('Unable to save food item.');
      }

      alert(editingId ? 'Food updated successfully!' : 'Food added successfully!');
      resetForm();
      await loadFoods();
    } catch (err) {
      alert(err.message || 'Something went wrong.');
    }
  };

  const handleEdit = (food) => {
    setEditingId(food.id);
    setName(food.name || '');
    setQuantity(food.quantity ?? '');
    setUnit(food.unit || 'kg');
    setExpiryDate(food.expiryDate || '');
    setCategory(food.category || 'Grains');

    document.querySelector('.food-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Unable to delete food item.');
      }

      if (editingId === id) {
        resetForm();
      }

      alert('Food deleted successfully!');
      await loadFoods();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const soonDate = new Date(today);
  soonDate.setDate(soonDate.getDate() + 3);

  const soonString = [
    soonDate.getFullYear(),
    String(soonDate.getMonth() + 1).padStart(2, '0'),
    String(soonDate.getDate()).padStart(2, '0'),
  ].join('-');

  const getStatus = (date) => {
    if (!date) return 'Unknown';
    if (date < todayString) return 'Expired';
    if (date <= soonString) return 'Expiring Soon';
    return 'Fresh';
  };

  const filteredFoods = foods.filter((food) =>
    (food.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const expiringCount = foods.filter(
    (food) => getStatus(food.expiryDate) === 'Expiring Soon'
  ).length;

  const expiredCount = foods.filter(
    (food) => getStatus(food.expiryDate) === 'Expired'
  ).length;

  const getEmoji = (foodCategory) => {
    const emojis = {
      Grains: '🌾',
      Dairy: '🥛',
      Vegetables: '🥦',
      Fruits: '🍎',
      Meat: '🍗',
      Other: '🍱',
    };

    return emojis[foodCategory] || '🍱';
  };

  return (
    <div className="pantry-page">
      <section className="pantry-hero">
        <span className="pantry-tag">FRESHTRACK PANTRY</span>
        <h1>Your Pantry, Your Control 🌿</h1>
        <p>
          Track your food, check expiry dates, and reduce food waste.
        </p>
      </section>

      <section className="pantry-stats">
        <div className="stat-card">
          <span>📦</span>
          <div>
            <p>Total Food Items</p>
            <h2>{foods.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⏰</span>
          <div>
            <p>Expiring Soon</p>
            <h2>{expiringCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>
          <div>
            <p>Expired Items</p>
            <h2>{expiredCount}</h2>
          </div>
        </div>
      </section>

      <section className="pantry-content">
        <form className="food-form" onSubmit={handleSubmit}>
          <h2>{editingId ? '✏️ Update Food' : '➕ Add Food Item'}</h2>
          <p>Enter your pantry food details below.</p>

          <label htmlFor="foodName">Food Name</label>
          <input
            id="foodName"
            type="text"
            placeholder="e.g. Rice"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="foodQuantity">Quantity</label>
          <div className="quantity-row">
            <input
              id="foodQuantity"
              type="number"
              min="0.01"
              step="any"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <select
              aria-label="Quantity unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="kg">Kg</option>
              <option value="grams">Grams</option>
              <option value="litres">Litres</option>
              <option value="pieces">Pieces</option>
            </select>
          </div>

          <label htmlFor="foodCategory">Category</label>
          <select
            id="foodCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Meat">Meat</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            type="date"
            min={todayString}
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />

          <button className="add-food-btn" type="submit">
            {editingId ? 'Update Food' : 'Add Food'}
          </button>

          {editingId && (
            <button
              className="cancel-btn"
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="food-section">
          <div className="food-section-header">
            <div>
              <h2>My Food Items 🧺</h2>
              <p>Manage all your stored food items.</p>
            </div>

            <input
              className="food-search"
              type="search"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && <p className="loading-message">Loading pantry items...</p>}

          {!loading && error && (
            <div className="empty-state">
              <p>{error}</p>
              <button type="button" onClick={loadFoods}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredFoods.length === 0 && (
            <div className="empty-state">
              <span>🥗</span>
              <h3>No food items found</h3>
              <p>Add a food item or try another search.</p>
            </div>
          )}

          {!loading && !error && filteredFoods.length > 0 && (
            <div className="food-grid">
              {filteredFoods.map((food) => {
                const status = getStatus(food.expiryDate);

                return (
                  <article className="food-item" key={food.id}>
                    <div className="food-item-top">
                      <span className="food-emoji">
                        {getEmoji(food.category)}
                      </span>
                      <span
                        className={`status-badge ${status
                          .toLowerCase()
                          .replaceAll(' ', '-')}`}
                      >
                        {status}
                      </span>
                    </div>

                    <h3>{food.name}</h3>
                    <p className="food-category">{food.category || 'Other'}</p>

                    <div className="food-detail">
                      <span>📦 Quantity</span>
                      <strong>
                        {food.quantity} {food.unit || (food.quantity === 1 ? 'item' : 'items')}
                      </strong>
                    </div>

                    <div className="food-detail">
                      <span>📅 Expiry Date</span>
                      <strong>{food.expiryDate || 'Not set'}</strong>
                    </div>

                    <div className="food-actions">
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => handleEdit(food)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDelete(food.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Pantry;
