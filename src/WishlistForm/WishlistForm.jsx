import React, { useState } from 'react';
import './WishlistForm.css';

const WishlistForm = () => {
  const [productId, setProductId] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    // Validate Product ID (for simplicity, we assume valid IDs are alphanumeric with 6-12 characters)
    const validProductId = /^[a-zA-Z0-9]{6,12}$/;

    if (!validProductId.test(productId)) {
      setError('Please enter a valid Product ID (6-12 alphanumeric characters).');
      return;
    }

    // Add product ID to wishlist
    setWishlist([...wishlist, productId]);
    setProductId('');
    setError('');
  };

  return (
    <div className="wishlist-form-container">
      <h1>Your Wishlist</h1>
      <form onSubmit={handleAddToWishlist} className="wishlist-form">
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={handleChange}
            placeholder="Enter Product ID"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="add-to-wishlist-btn">Add to Wishlist</button>
      </form>

      <div className="wishlist">
        <h2>Your Wishlist</h2>
        <ul>
          {wishlist.length > 0 ? (
            wishlist.map((id, index) => (
              <li key={index} className="wishlist-item">{id}</li>
            ))
          ) : (
            <p>No products in your wishlist yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WishlistForm;
