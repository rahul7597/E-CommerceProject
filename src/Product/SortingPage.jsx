import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SortingPage.css';

const SortingPage = () => {
  const [sortOption, setSortOption] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);  // State for all products from both APIs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Fetch products from both APIs when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products from the first API (fakestoreapi)
        const response1 = await axios.get('https://fakestoreapi.com/products');
        const productsFromAPI1 = response1.data;

        // Fetch products from the second API (your custom API - 'getall')
        const response2 = await axios.get('http://localhost:1112/getall');
        const productsFromAPI2 = response2.data;

        // Combine products from both APIs
        const allProducts = [
          ...productsFromAPI1.map(product => ({
            ...product,
            rating: product.rating || { rate: 0, count: 0 },
            image: product.image || 'default-image.jpg',  // Fallback for missing images
          })),
          ...productsFromAPI2.map(product => ({
            ...product,
            rating: { rate: 0, count: 0 },  // Default rating for products from getall API
            image: product.image
              ? `data:image/jpeg;base64,${product.image}`  // If image is Base64-encoded, use this format
              : 'default-image.jpg',  // Fallback image
            title: product.productTitle,
            description: product.productDescription,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
          }))
        ];

        setProducts(allProducts);  // Update state with combined products
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sorting function using if-else
  const sortedProducts = () => {
    let sorted = [...products];

    // Filter by search term (name or category)
    if (searchTerm !== '') {
      sorted = sorted.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sorting logic
    if (sortOption === 'nameAsc') {
      sorted.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
    } else if (sortOption === 'nameDesc') {
      sorted.sort((a, b) => {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      });
    } else if (sortOption === 'priceLowToHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      sorted.sort((a, b) => b.price - a.price);
    }

    // Filter by color (if color exists in your data)
    if (filterColor !== '') {
      sorted = sorted.filter(product => product.color === filterColor);
    }

    // Filter by category
    if (category !== '') {
      sorted = sorted.filter(product => product.category === category);
    }

    // Filter by price range
    sorted = sorted.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    return sorted;
  };

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange([0, value]);
  };

  // Handle Add to Cart
  const handleAddToCart = (productId) => {
    setCart((prevCart) => [...prevCart, productId]);
  };

  // Handle Remove from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(id => id !== productId));
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.includes(productId);
  };

  return (
    <div className="sorting-page-container">
      <h1>Sort, Filter, and Search Products</h1>

      {/* Loading state */}
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="main-container">
        {/* Sidebar with filters */}
        <div className="sidebar">
          <div className="filter-item">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="priceLowToHigh">Price (Low to High)</option>
              <option value="priceHighToLow">Price (High to Low)</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="color">Filter by Color:</label>
            <select
              id="color"
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
            >
              <option value="">Select Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="category">Filter by Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="price-range">Filter by Price Range:</label>
            <input
              type="range"
              id="price-range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              list="tickmarks"
            />
            <span> ${priceRange[0]} - ${priceRange[1]}</span>
          </div>

          {/* Search Input */}
          <div className="filter-item">
            <label htmlFor="search">Search Products:</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Display Area */}
        <div className="product-list">
          {sortedProducts().length > 0 ? (
            sortedProducts().map((product, index) => (
              <div key={index} className="product-card">

              <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image || 'default-image.jpg'}
                    alt={product.title || 'Product Image'}
                    className="product-image"
                  />
                  <h6>{product.title ? product.title.substring(0, 28) : 'No title available'}</h6>
                </Link>

                <div className="price-rating-container">
                  <p className="price">${product.price}</p>
                  <div className="rating">
                    {product.rating && product.rating.rate > 0 ? (
                      Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className={`fa fa-star ${index < product.rating.rate ? 'checked' : ''}`}
                        ></i>
                      ))
                    ) : (
                      <p>No rating available</p>
                    )}
                  </div>
                </div>

                {/* <p>{product.description.substring(0, 150) || 'No description available'}</p> */}
                {/* <p>Category: {product.category || 'No category'}</p> */}
                {/* <p>Quantity: {product.quantity || 'N/A'}</p> */}

                <div className="cart-buttons">
                  {isInCart(product.id) ? (
                    <button onClick={() => handleRemoveFromCart(product.id)}>- Remove from Cart</button>
                  ) : (
                    <button onClick={() => handleAddToCart(product)}>+ Add to Cart</button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingPage;
