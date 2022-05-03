import React from "react";
import "./ProductDetail.css";
import buy1 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom";

const ProductDetail = () => {
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    <>
      <div className="small-container single-product">
        <div className="row">
          <div className="col-2">
            <img src={buy1} alt="productdetail" width="100%" />
          </div>
          <div className="col-2">
            <p>Home / Cloths</p>
            <h2>Red T-Shirt</h2>
            <h4>$100.00 </h4>
            <select>
              <option>Select Size</option>
              <option>Large</option>
              <option>Small</option>
            </select>
            <input type="number " value="1" />
            <Link to="/cart" className="btn">
              Add to Cart
            </Link>
            <h3>Product Details</h3>
            <br />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
              tempore pariatur dolorem quasi. Cumque nulla, deserunt neque harum
              voluptas distinctio!
            </p>
          </div>
        </div>
      </div>

      <div className="small-container">
        <div className="row row-2">
          <h2>Related Products</h2>
          <p>View More</p>
        </div>
      </div>

      <div className="small-container">
        <div className="row">
          <div className="col-4">
            <img src={buy1} alt="product" />
            <h4> Red T-shirt for men </h4>
            <ReactStars {...ratingOptions} />
            <p>$ 100.0</p>
          </div>

          <div className="col-4">
            <img src={buy1} alt="product" />
            <h4> Red T-shirt for men </h4>
            <ReactStars {...ratingOptions} />
            <p>$ 100.0</p>
          </div>

          <div className="col-4">
            <img src={buy1} alt="product" />
            <h4> Red T-shirt for men </h4>
            <ReactStars {...ratingOptions} />
            <p>$ 100.0</p>
          </div>

          <div className="col-4">
            <img src={buy1} alt="product" />
            <h4> Red T-shirt for men </h4>
            <ReactStars {...ratingOptions} />
            <p>$ 100.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
