import React from "react";
import "./ProductCard.css";
import buy1 from "../../images/product2.jpg";
import buy2 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <React.Fragment>
      <div className="product-card">
        <Link to={`/productdetail/${product._id}`}>
          <div className="product-card-img">
            <img
              src="https://static-01.daraz.pk/p/4b8a12407bdaf4e478f2b45703ae5209.jpg"
              alt="product"
            />
          </div>
          <div className="product-card-content">
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
            <div className="product-card-price">Rs {product.price}</div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
