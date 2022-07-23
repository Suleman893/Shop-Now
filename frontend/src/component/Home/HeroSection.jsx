import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <React.Fragment>
      <div className="hero-bg">
        <div className="hero-wrapper">
          <div className="hero-img-content">
            <h2>Keep The Fashion Vibe Alive</h2>
            <p>Explore our products</p>
            <div className="hero-section-btn">
              <button className="btn">
                <Link to="/products">Dive Right In</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeroSection;
