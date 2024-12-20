import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GopalapiPage.css'; // Assuming you want to style your product cards

const GopalapiPage = () => {
  const [products, setProducts] = useState([]);  // State to hold the fetched products
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  // Fetching product data from API
  useEffect(() => {
    axios
      .get('http://localhost:1112/getall')
      .then((response) => {
        setProducts(response.data);  // Update state with product data
        setLoading(false);           // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to load products. Please try again.');
        setLoading(false);  // Set loading to false in case of error
        console.error('Error fetching products:', err);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // If products are still loading, show a loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // If there was an error fetching the products, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-page">
      <h1>Product List</h1>
      <div className="product-container">
        {/* Render product cards */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`data:image/jpeg;base64,${product.image}`}  // Assuming the image is base64 encoded
              alt={product.productName}
              className="product-image"
            />
            <div className="product-details">
              <h2>{product.productName}</h2>
              <p className="product-title">{product.productTitle}</p>
              <p>{product.productDescription}</p>
              <p><strong>Price: ${product.price}</strong></p>
              <p><strong>Category: {product.category}</strong></p>
              <p><strong>Quantity: {product.quantity}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GopalapiPage;
