import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container ">
        <div className="row">
          <div className="footer-col-1">
            <h3> Download Our App</h3>
            <p> Download App for Android & Ios devices</p>
            <div className="app-logo">
              <img src={playStore} alt="playstore" />
              <img src={appStore} alt="appStore" />
            </div>
          </div>

          <div className="footer-col-2">
            <div className="logo">Shop now</div>
            <p>Our purpose is to make things available to you easily</p>
          </div>

          <div className="footer-col-4">
            <h3>Follow us on</h3>
            <ul>
              <li>Facebook</li>
              <li>Twiter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">Copy right - suleman</p>
      </div>
    </div>
  );
};

export default Footer;
