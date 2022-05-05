import React from "react";
import {Link} from "react-router-dom";
import mobile from "../../images/mobile.png";
const Offer = () => {
  return (
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img src={mobile} alt="offer_img" />
          </div>
          <div className="col-2">
            <p> Exclusively Available </p>
            <h1>Iphone X</h1>
            <small>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas,
              laboriosam. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Minima aperiam, iste ab temporibus dolorem corporis sapiente
              laboriosam. Ab enim harum qui reprehenderit assumenda voluptatum
              et, alias eveniet modi! Tenetur, saepe?
            </small>
            <Link to="/" className="btn">
              Buy Now &#8594;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
