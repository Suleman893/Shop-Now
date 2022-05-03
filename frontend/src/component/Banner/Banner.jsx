import React from "react";
import "./Banner.css";
import banner from "../../images/banner.png";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="row">
      <div className="col-2">
        <h1>
          Buy latest products from <br />
          Shop Now
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, dicta?
        </p>
        <Link to="/product" className="btn">
          Explore Now &#8594;
        </Link>
      </div>

      <div className="col-2">
        <img src={banner} alt="banner" />
      </div>
    </div>
  );
};

export default Banner;
