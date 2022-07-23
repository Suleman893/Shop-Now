import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/actions/userActions";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUserInfo, currentUser } = useSelector(
    (state) => state.loginUser
  );
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Shop Now</h1>
          </Link>
        </div>
        <nav>
          <ul className="nav">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products" className="myactive">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>

            <li>
              <NavLink to="/cart/62c9713f070a74188a24d26">
                <i className="fas fa-shopping-cart mr-8 cart-icon">
                  <span className="cart-no">
                    {cartItems.reduce((qty, item) => qty + Number(item.qty), 0)}
                  </span>
                </i>
              </NavLink>
            </li>
            <li>
              {loggedInUserInfo
                ? loggedInUserInfo.role === "admin" && (
                    <NavLink to="/admin">
                      <li className="fa fa-users"></li>
                    </NavLink>
                  )
                : " "}
            </li>
            <li>
              <NavLink to="/myProfile">
                <i className="fa fa-user  mr-8"></i>
              </NavLink>
            </li>
            <li>
              {currentUser && (
                <i
                  className="fa fa-sign-out "
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/signin");
                  }}
                ></i>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
