import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();  // Get the productId from URL
  const navigate = useNavigate(); // For navigation after adding to cart
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [toggleMessage, setToggleMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details and similar products
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Fetch product from Fake Store API
        const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);

        // If found, set the product state
        if (productResponse.data) {
          setProduct(productResponse.data);
        } else {
          throw new Error('Product not found');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handle Add to Cart functionality
  const toggleCart = (product) => {
    try {
      let updatedCart;
      // Check if the product is already in the cart
      if (cart.some(item => item.id === product.id)) {
        // Remove the product from the cart
        updatedCart = cart.filter(item => item.id !== product.id);
        setAddedToCart(false);
        setToggleMessage('Removed from Cart');
      } else {
        // Add the product to the cart
        updatedCart = [...cart, product];
        setAddedToCart(true);
        setToggleMessage('Added to Cart');
      }

      // Save cart to localStorage and update the state
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);

      // Navigate to the cart page
      navigate('/cart');

      // Clear toggle message after 2 seconds
      setTimeout(() => {
        setToggleMessage('');
      }, 2000);
    } catch (err) {
      console.error('Error toggling cart:', err);
      setError('An error occurred while updating the cart.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="product-detail-container">
      {product ? (
        <div className={`product-detail ${addedToCart ? 'highlight' : ''}`}>
          <img src={product.image || 'default-image.jpg'} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating?.rate} / 5</p>

          <button
            onClick={() => toggleCart(product)}
            className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          >
            {addedToCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          {toggleMessage && <div className="toggle-message">{toggleMessage}</div>}
        </div>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default ProductDetail;
