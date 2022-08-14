import React from "react";
import "./HomeProductCard.css";
import buy1 from "../../images/product2.jpg";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <React.Fragment>
      <div className="home-product-card">
        <Link to={`/productdetail/${product._id}`}>
          <div className="home-product-card-img">
            <img src={product.images[0].url} alt="homeproduct" />
          </div>
          <div className="home-product-card-content">
            <h3>{product.productName}</h3>
            <p>{product.category}</p>
            <div className="no-of-reviews">
              <ReactStars
                edit={false}
                color="rgba(20,20,20,0.1)"
                activeColor="#ffd700"
                size={window.innerWidth < 600 ? 20 : 25}
                value={product.ratings}
                isHalf={true}
              />
              <p>({product.numOfReviews} reviews) </p>
            </div>
            <div className="home-product-card-price">Rs {product.price}</div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
