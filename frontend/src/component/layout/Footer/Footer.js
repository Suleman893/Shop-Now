import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/AppStore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App Now</h4>
        <p>Download App for Android and Ios </p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our focus</p>
        <p>Copyright 2021 &copy; Suleman</p>
      </div>

      <div className="rightFooter">
        <h4> Follow us </h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
