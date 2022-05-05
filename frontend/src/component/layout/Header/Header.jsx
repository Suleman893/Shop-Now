import React from "react";
import "./Header.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../redux/actions/userActions";
import menu from "../../../images/menu.png";
import cart from "../../../images/cart.png";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginUser);
  const {currentUser} = userState;
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;

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
            {currentUser ? (
              <>
                <li> {currentUser.name}</li>
                <li
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/signin");
                  }}
                >
                  Logout
                </li>
                <li>Order</li>
              </>
            ) : (
              <li>
                <Link to="/signup">Account</Link>
              </li>
            )}
          </ul>
        </nav>
        <Link to="/">
          {" "}
          <i className="fas fa-shopping-cart">
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>{" "}
          </i>
        </Link>
      </div>
    </>
  );
};

export default Header;
