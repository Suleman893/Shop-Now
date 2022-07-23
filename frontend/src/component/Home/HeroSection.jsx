import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <React.Fragment>
      <div className="hero-img">
        {/*   Change classes name to HERO SECTION*/}
        <div className="hero-wrapper">
          <div className="hero-img-content">
            <h2>Keep The Fashion Vibe Alive</h2>
            <p>Explore our products</p>
            <div className="hero-section-btn">
              <button className="btn">Dive Right In</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeroSection;
