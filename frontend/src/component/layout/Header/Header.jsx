import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/actions/userActions";
import logo from "../../../images/logo.png";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginUser);
  const { currentUser } = userState;
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
            {currentUser ? (
              <div>
                <li> {currentUser.name}</li>
                <li
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/signin");
                  }}
                >
                  Logout
                </li>
                <li>
                  <Link to="/myProfile">Profile</Link>
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
          <i className="fas fa-shopping-cart">
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>{" "}
          </i>
        </div>
      </div>
    </header>
  );
};

export default Header;
