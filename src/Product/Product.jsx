// fetch('https://fakestoreapi.com/products')Bhai, yeh toh bahut hi accha sawal hai!

// Product.js
import React, { useEffect, useState } from 'react';
import './Product.css'

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(15);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1112/getall')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleFilter = (category) => {
    const filteredProducts = products.filter((product) => product.category === category);
    setFilteredProducts(filteredProducts);
  };

  const handleSort = () => {
    const sortedProducts = products.sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
    setFilteredProducts(sortedProducts);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="product-page">
      <h1>Products</h1>
      <div className="filter-sort">
        <button onClick={() => handleFilter('electronics')}>Electronics</button>
        <button onClick={() => handleFilter('jewelery')}>Jewelery</button>
        <button onClick={() => handleSort()}>Sort by Price</button>
      </div>
      <div className="product-flex">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h6>{product.title}</h6>
            <p className='description'>{product.description.substring(0, 150)}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Product;