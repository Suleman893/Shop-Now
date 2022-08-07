import React from "react";
import "./CallToAction.css";

const CallToAction = () => {
  return (
    <React.Fragment>
      <div className="call-action">
        <h1>Repair Service</h1>
        <h3>
          Up to <span>80% Off </span>- on all t-shirts and accessories
        </h3>
        <div className="explore-more-btn">
          <button className="btn">Explore More</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CallToAction;
