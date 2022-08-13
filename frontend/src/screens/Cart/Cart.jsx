import React, { useEffect, useState } from "react";
import buy1 from "../../images/product2.jpg";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../component/Layout/MetaData";
import Checkout from "../../component/Checkout/Checkout";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import "../Cart/Cart.css";
import { useAlert } from "react-alert";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";
import { animateScroll as scroll } from "react-scroll";

const Cart = () => {
  scroll.scrollTo(0);

  const { currentUser } = useSelector((state) => state.loginUser);
  const alert = useAlert();
  const param = useParams();
  const productId = param.id;
  let [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty");
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const [loginCheck, setLoginCheck] = useState(false);

  const loginChecker = () => {
    if (!currentUser) {
      alert.error("Please login before checkout");
    } else {
      setLoginCheck(true);
    }
  };

  return (
    <React.Fragment>
      <MetaData title="Product Cart" />
      <Header />
      <div className="cart-container">
        <h2 className="page-title">Your Cart</h2>
        <table className="my-20">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
            <th>Subtotal</th>
          </tr>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h1> Empty cart </h1>
              <Link to="/products"> Buy somes products</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <tr>
                <td>
                  <div className="cart-img">
                    <img src={buy1} alt="cart-item" />
                  </div>
                </td>
                <td>
                  <Link to={`/productdetail/${item.product}`}></Link>
                  <h3 style={{ textTransform: "capitalize" }}>{item.name}</h3>
                </td>
                <td>
                  <small>PKR: {item.price}</small>
                </td>
                <td>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <small
                    onClick={() => {
                      removeFromCartHandler(item.product);
                    }}
                  >
                    <li
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: "18px",
                      }}
                    ></li>
                  </small>
                </td>
                <td>
                  <b>{item.price}</b>
                </td>
              </tr>
            ))
          )}
        </table>
        <div className="total-price">
          <table>
            <tr>
              <td>
                <b>Total Items</b>{" "}
              </td>
              <td>
                <b>
                  {" "}
                  ({cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)})
                </b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Subtotal</b>{" "}
              </td>
              <td>
                <b>
                  PKR:{" "}
                  {cartItems
                    .reduce((price, item) => item.price * item.qty + price, 0)
                    .toFixed(2)}
                </b>
              </td>
            </tr>
          </table>
        </div>
        {loginCheck ? (
          <Checkout
            subTotal={cartItems
              .reduce((qty, item) => qty + item.qty * item.price, 0)
              .toFixed(2)}
          />
        ) : (
          cartItems.length !== 0 && (
            <div style={{ width: "15%" }}>
              <button onClick={loginChecker} className="btn">
                Checkout{" "}
                <ShoppingCartCheckoutIcon style={{ fontSize: "17px" }} />
              </button>
            </div>
          )
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Cart;
