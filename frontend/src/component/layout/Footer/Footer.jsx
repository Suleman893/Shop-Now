import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container ">
        <div className="footer-row">
          <div className="footer-col-1">
            <h3> Download Our App</h3>
            <p> Download App for Android & Ios devices</p>
            <div className="app-logo">
              <a href="#">
                <img src={playStore} alt="playstore" />{" "}
              </a>
              <a href="#">
                <img src={appStore} alt="app-store" />
              </a>
            </div>
          </div>

          <div className="footer-col-2">
            <div className="logo">
            <Link to="/">
            <h1>Shop Now</h1>
          </Link>
            </div>
            <p>Our purpose is to make products available to you easily</p>
          </div>

          <div className="footer-col-3">
            <h3>Follow us on</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twiter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">
          {" "}
          <b> © Copy right </b>- suleman ahmad
        </p>
      </div>
    </footer>
  );
};

export default Footer;
