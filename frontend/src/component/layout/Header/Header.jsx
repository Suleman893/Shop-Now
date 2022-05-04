import React from "react";
import "./Header.css";
import cart from "../../../images/cart.png";
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">Shop Now</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/signin">Account</Link>
            </li>
          </ul>
        </nav>
        <Link to="/cart">
          {" "}
          <img src={cart} alt="cart" width="25px" height="30px" />
        </Link>
      </div>
    </>
  );
};

export default Header;
