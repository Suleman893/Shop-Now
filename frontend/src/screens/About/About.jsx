import "./About.css";
import MetaData from "../../component/Layout/MetaData";
import aboutpic from "../../images/logo.png";
import { animateScroll as scroll } from "react-scroll";

import React from "react";

const About = () => {
  scroll.scrollTo(1);

  return (
    <React.Fragment>
      <MetaData title="About" />
      <div className="about-bg">
        <h1>About Us</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="about-left-col">
            <h1>Shop Now</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              modi voluptates sit assumenda ducimus est sunt amet iste, impedit
              repudiandae laborum quod labore itaque officia unde. Eum fuga ad
              aliquam?
            </p>
          </div>

          <div className="about-right-col">
            <div className="about-img">
              <img src={aboutpic} alt="about" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
