import React, { useState, useEffect } from 'react';
import './AdvertisementSlider.css';

const AdvertisementSlider = () => {
  // Define the product data directly (no API call)
  const products = [
    { id: 1, title: 'Product 1', image: 'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/139e8c93a918366a.jpeg?q=20', link: '#product1' },
    { id: 2, title: 'Product 2', image: 'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/dd484f1b19c67712.jpg?q=20', link: '#product2' },
    { id: 3, title: 'Product 3', image: 'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/0511ba08d5abe9aa.jpg?q=20', link: '#product3' },
    { id: 4, title: 'Product 4', image: 'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/1316eb53d6f52c71.jpg?q=20', link: '#product4' },
    { id: 5, title: 'Product 5', image: 'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/a76db078b31108e1.jpeg?q=20', link: '#product5' },
    { id: 6, title: 'Product 6', image: 'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/a76db078b31108e1.jpeg?q=20', link: '#product6' },
    { id: 7, title: 'Product 7', image: 'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/1316eb53d6f52c71.jpg?q=20', link: '#product6' }
  ];

  const [visibleProducts, setVisibleProducts] = useState([]);
  const productsToShow = products.length; // Number of products to show at a time

  // Handle the sliding logic
  useEffect(() => {
    // Initialize visible products when the data is first loaded
    setVisibleProducts(products.slice(0, productsToShow)); // Load first 4 products

    // Start the sliding effect using setInterval
    const slideInterval = setInterval(() => {
      setVisibleProducts((prev) => {
        const newProducts = [...prev.slice(1), prev[0]]; // Slide the products by moving the first item to the end
        return newProducts;
      });
    }, 2000); // Slide every 2 seconds

    return () => clearInterval(slideInterval); // Clean up on component unmount
  }, []);

  return (
    <div className="slider-container">
      <div className="slider">
        {visibleProducts.map((product) => (
          <div key={product.id} className="slider-item">
            <a href={product.link} className="slider-link">
              <img src={product.image} alt={product.title} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSlider;
