import React from "react";
import ReactStars from "react-rating-stars-component";
import "./HomeProduct.css";
import buy1 from "../../images/product.jpg";
const HomeProducts = ({latestProducts, featuredProduct}) => {
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5, //here product.details
    isHalf: true,
  };

  return (
    // <div className="small-container">
    <>
      <h2 className="title">Featured Products</h2>
      <div className="row">
        {featuredProduct.map((featuredProduct) => (
          <div className="col-4">
            <img src={buy1} alt="product" />
            <h4> {featuredProduct.name}</h4>
            <ReactStars {...ratingOptions} />
            <p>$ {featuredProduct.price}</p>
          </div>
        ))}
      </div>
      <h2 className="title">Latest Products</h2>
      <div className="row">
        {latestProducts.map((latestPro) => (
          <div className="col-4">
            <img src={buy1} alt="product" />
            <h4> {latestPro.name}</h4>
            <ReactStars {...ratingOptions} />
            <p>$ {latestPro.price}</p>
          </div>
        ))}
      </div>
    </>
    // </div>
  );
};

export default HomeProducts;
