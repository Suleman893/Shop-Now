import "./About.css";
import MetaData from "../../component/Layout/MetaData";
import aboutpic from "../../images/aboutus.jpg";
import { animateScroll as scroll } from "react-scroll";
import React from "react";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const About = () => {
  scroll.scrollTo(1);

  return (
    <React.Fragment>
      <MetaData title="About" />
      <Header />
      <div className="about-bg">
        <h1>About Us</h1>
      </div>
      <div className="container">
        <div className="about-row">
          <div className="about-left-col">
            <p>
              Shop now is digital platform that allows the user to register
              themselve, add products to card and order them using stripe
              payment method. The admin dashboard allows the admin to perform
              CRUD operations related to user,products,orders.
            </p>
          </div>
          <div className="about-right-col">
            <div className="about-img">
              <img src={aboutpic} alt="about" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
