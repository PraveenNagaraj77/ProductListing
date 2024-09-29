"use client"; 

import '../styles.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSelectedCategory } from "../store/slices/categorySlice";
import { fetchProducts, resetProducts, setCurrentPage } from "../store/slices/productSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons'; 
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import Footer from './Footer';

export default function Home() {
  const dispatch = useDispatch();
  const { categories = [], selectedCategory } = useSelector((state) => state.categories);
  const { products = [], totalProducts, currentPage, limit } = useSelector((state) => state.products);

  const [isLightTheme, setIsLightTheme] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetProducts());
    dispatch(fetchProducts({ category: selectedCategory || "", skip: 0, limit: totalProducts || limit }));
  }, [dispatch, selectedCategory, limit, totalProducts]);

  const totalPages = selectedCategory ? Math.ceil(totalProducts / limit) : 1;

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchProducts({ category: selectedCategory, skip: (page - 1) * limit, limit }));
  };

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={isLightTheme ? "light-theme" : ""}>
      <div className="header">
        <div className="left-icons">
          <button onClick={toggleTheme} className="theme-toggle-button">
            <FontAwesomeIcon icon={isLightTheme ? faMoon : faLightbulb} size="lg" />
          </button>
        </div>
        <div className="right-icons">
          <a href="https://github.com/PraveenNagaraj77" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a href="https://portfolio-prav-een.netlify.app/" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </a>
        </div>
      </div>

      <h1>Product Listing</h1>
      
      <select onChange={(e) => dispatch(setSelectedCategory(e.target.value))} value={selectedCategory || ""}>
        <option value="">All Products</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input" 
      />

      <div className='product-container'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <h2>{product.title || "No Title"}</h2>
              <p>{product.description || "No Description"}</p>
              <p>Price: ${product.price}</p>
              <img src={product.thumbnail} alt={product.title} width="100" />
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {selectedCategory && totalProducts > limit && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          <span>{`${currentPage} of ${totalPages}`}</span>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
