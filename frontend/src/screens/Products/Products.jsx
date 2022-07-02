import React, { useEffect, useState } from "react";
import "./Products.css";
import buy1 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import { getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const dispatch = useDispatch();

  const { loading, error, products, totalPages } = useSelector(
    (state) => state.products
  );

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  useEffect(() => {
    dispatch(getProduct(page));
    setNumberOfPages(totalPages);
  }, [dispatch, page]);

  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  const goToPrevious = () => {
    setPage(Math.max(0, page - 1));
  };

  const goToNext = () => {
    setPage(Math.min(numberOfPages, page + 1));
  };

  return (
    <div className="container">
      <div className="product-top">
        <h2 className="page-title">Products</h2>
        <input
          type="text"
          name="searchbar"
          placeholder="Search product..."
          className="product-search"
        />
      </div>
      <div className="row">
        <div className="left">
          <div className="filter-section">
            <h5>Categories</h5>
            <ul>
              <li>Mens Fashion</li>
              <li>Women Fashion</li>
              <li>Electronic Devices</li>
              <li>Home & Lifestyle</li>
              <li>Sports & Outdoor</li>
              <li>Automotive & Motorbike</li>
              <li>Groceries & Pets</li>
              <li>Health & Beauty</li>
            </ul>
          </div>
        </div>

        <div className="right">
          {products.map((product) => (
            <div className="product-card">
              <Link to={`/productdetail/${product._id}`}>
                <div className="product-card-img">
                  <img src={buy1} alt="product-card" />
                </div>
                <div className="product-card-content">
                  <h1>{product.productName}</h1>
                  <p>{product.description}</p>
                  <p className="product-card-price">Rs. {product.price}</p>
                  <p>{product.numOfReviews}</p>
                  <p>{product.category}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="page-btn">
        <button onClick={goToPrevious}>Pre</button>
        {pages.map((pageIndex) => (
          <button key={pageIndex} onClick={() => setPage(pageIndex)}>
            {pageIndex + 1}
          </button>
        ))}
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default Products;
