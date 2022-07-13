import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/actions/userActions";
import logo from "../../../images/logo.png";
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
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/products`}>Products</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {loggedInUserInfo ? (
              <div>
                <li style={{ textTransform: "capitalize" }}>
                  {" "}
                  {loggedInUserInfo.name}
                </li>
              </div>
            ) : (
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="header-btns">
          <Link to="/cart/62c9713f070a74188a24d26">
            <i className="fas fa-shopping-cart mr-8">
              <span>
                {cartItems.reduce((qty, item) => qty + Number(item.qty), 0)}
              </span>
            </i>
          </Link>
          {loggedInUserInfo
            ? loggedInUserInfo.role === "admin" && (
                <Link to="/admin">
                  <li className="fa fa-users"></li>
                </Link>
              )
            : " "}
          <Link to="/myProfile">
            <i className="fa fa-user  mr-8"></i>
          </Link>
          {currentUser && (
            <i
              className="fa fa-sign-out "
              onClick={() => {
                dispatch(logoutUser());
                navigate("/signin");
              }}
            ></i>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
