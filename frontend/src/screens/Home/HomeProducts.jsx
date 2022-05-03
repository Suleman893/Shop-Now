import React from "react";
import ReactStars from "react-rating-stars-component";
import "./HomeProduct.css";
import buy1 from "../../images/product.jpg";
const HomeProducts = () => {
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    <div className="small-container">
      <h2 className="title">Latest Products</h2>
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
  );
};

export default HomeProducts;
