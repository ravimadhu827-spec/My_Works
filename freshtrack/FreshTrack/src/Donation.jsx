
import { useState } from "react";

function Donation() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleDonation = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/donations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodName,
            quantity,
            expiryDate,
            location,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Donation submission failed");
      }

      setMessage("Donation submitted successfully!");

      setFoodName("");
      setQuantity("");
      setExpiryDate("");
      setLocation("");
    } catch (error) {
      setMessage(
        error.message || "Unable to connect to backend"
      );
    }
  };

  return (
    <div className="simple-page">
      <h1>Donate Food ❤️</h1>
      <p>Share extra food and help reduce food waste.</p>

      <form className="simple-form" onSubmit={handleDonation}>
        <label>Food Item Name</label>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Example: Rice"
          required
        />

        <label>Quantity</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Example: 2 kg"
          required
        />

        <label>Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          min={new Date().toLocaleDateString("en-CA")}
          required
        />

        <label>Pickup Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter pickup location"
          required
        />

        <button type="submit">Submit Donation</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Donation;
