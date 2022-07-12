import React, { useEffect } from "react";
import buy1 from "../../images/product.jpg";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Link,  useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../component/Layout/MetaData";
import Checkout from "../../component/Checkout/Checkout";
import "../Cart/Cart.css";

const Cart = () => {
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

  const checkoutHandler = () => {
    //if logged in then shipping page otherwise signin page using history.push and redirect
  };
  return (
    <>
      <MetaData title="Product Cart" />
      <div className="cart-container">
        <h2 className="page-title">Your Cart</h2>
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          {cartItems.length === 0 ? (
            <div>
              <h1> Nothing added in cart </h1>
              <Link to="/products"> Buy somes products</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <tr>
                <td>
                  <div className="cart-info">
                    <img src={buy1} alt="cart" />
                    <div>
                      <Link to={`/productdetail/${item.product}`}></Link>
                      <h1>{item.name}</h1>
                      <small>PKR: {item.price}</small>
                      <br />
                      <small
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                      >
                        <li
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                          style={{ cursor: "pointer" }}
                        ></li>
                      </small>
                      <br />
                    </div>
                  </div>
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
                <td>{item.price}</td>
              </tr>
            ))
          )}
        </table>
        <div className="total-price">
          <table>
            <tr>
              <td>Total Items </td>
              <td>
                ({cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)})
              </td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>
                PKR:
                {cartItems
                  .reduce((price, item) => item.price * item.qty + price, 0)
                  .toFixed(2)}
              </td>
            </tr>
            {/*<tr>
              <td>Tax</td>
              <td>PKR:10.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>PKR:210.00</td>
              </tr>  */}
          </table>
        </div>
        <button
          className="btn"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
        >
          <Checkout
            subTotal={cartItems
              .reduce((qty, item) => qty + item.qty * item.price, 0)
              .toFixed(2)}
          />
          &#8594;
        </button>
      </div>
    </>
  );
};

export default Cart;
