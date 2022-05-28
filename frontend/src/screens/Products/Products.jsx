import React, { useEffect } from "react";
import "./Products.css";
import buy1 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import { getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    <div className="container">
      <div className="product-top">
        <h2 className="page-title">Products</h2>
        <input
          type="text"
          name="searchbar"
          placeholder="search product..."
          className="product-search"
        />
      </div>
      <div className="row">
        <div className="left">
          <div className="filter-section">
            <h5>Categories</h5>
            <ul>
              <li>Garments</li>
              <li>Electronic</li>
              <li>Bakery</li>
              <li>Mobiles</li>
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
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                  <p>{product.stock}</p>
                  <p>{product.numOfReviews}</p>
                  <p>{product.category}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="page-btn">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>&#8594;</span>
      </div>
    </div>
  );
};

export default Products;
