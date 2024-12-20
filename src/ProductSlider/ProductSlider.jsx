import axios from 'axios'; // Import axios
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './ProductSlider.css';

const ProductSlider = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering products
  const [products, setProducts] = useState([]); // List of products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search and category
  const [categories, setCategories] = useState([]); // List of product categories
  const sliderRef = useRef(null); // Ref for product slider

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        const fetchedProducts = response.data;
        setProducts(fetchedProducts); // Set the fetched products
        setFilteredProducts(fetchedProducts); // Set initial filtered products

        const uniqueCategories = [...new Set(fetchedProducts.map(product => product.category))];
        setCategories(uniqueCategories); // Set unique categories
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      product => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
  };

  const slideLeft = () => {
    const productCardWidth = sliderRef.current.children[0].offsetWidth + 10;
    sliderRef.current.scrollLeft -= productCardWidth;
  };

  const slideRight = () => {
    const productCardWidth = sliderRef.current.children[0].offsetWidth + 10;
    sliderRef.current.scrollLeft += productCardWidth;
  };

  return (
    <div className="product-slider-container">
      <h2>Our Products</h2>
      <div className="search-bars">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Search for products..." 
        />
        <button type="submit">Search</button>
      </div>

      <div className="slider-buttons">
        <button onClick={slideLeft} className="slide-button left">
          &#8592; {/* Left arrow */}
        </button>

        <div className="category-filter">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className="category-button" 
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button onClick={slideRight} className="slide-button right">
          &#8594; {/* Right arrow */}
        </button>
      </div>

      <div className="product-slider" ref={sliderRef}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
              <div className="product-card">
                <img src={product.image} alt={product.title} />
                <h5>{product.title}</h5>
                <p className="description">{product.description.substring(0, 100)}</p>
                <div className="product-price-rating">
                  <span className="product-price">{`$${product.price}`}</span>
                  <span className="product-rating">Rating: {product.rating.rate} / 5</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-items-found">No items found</div>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
