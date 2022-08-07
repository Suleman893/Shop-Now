import React from "react";
import "./Features.css";
import f1 from "../../images/features/f1.png";
import f2 from "../../images/features/f2.png";
import f3 from "../../images/features/f3.png";
import f4 from "../../images/features/f4.png";
import f5 from "../../images/features/f5.png";
import f6 from "../../images/features/f6.png";

const Features = () => {
  return (
    <React.Fragment>
      <div className="features-bg">
        <div className="container">
          <div className="features-section">
            <div className="feature-box">
              <img src={f1} alt="f1" />
              <h6>Free Shipping</h6>
            </div>

            <div className="feature-box">
              <img src={f2} alt="f2" />
              <h6>Free Shipping</h6>
            </div>

            <div className="feature-box">
              <img src={f3} alt="f3" />
              <h6>Free Shipping</h6>
            </div>

            <div className="feature-box">
              <img src={f4} alt="f4" />
              <h6>Free Shipping</h6>
            </div>

            <div className="feature-box">
              <img src={f5} alt="f5" />
              <h6>Free Shipping</h6>
            </div>

            <div className="feature-box">
              <img src={f6} alt="f6" />
              <h6>Free Shipping</h6>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Features;
