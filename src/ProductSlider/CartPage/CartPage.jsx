import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const handleBuyNow = () => {
    // Implement Buy Now functionality (e.g., navigate to checkout page)
    console.log('Proceeding to checkout...');
    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some products to the cart.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-product">
              <img src={product.image || 'default-image.jpg'} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </div>
          ))}
          <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
