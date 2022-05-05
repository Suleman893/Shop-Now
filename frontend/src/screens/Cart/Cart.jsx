import React, {useEffect} from "react";
import "./Cart.css";
import buy1 from "../../images/product.jpg";
import {addToCart, removeFromCart} from "../../redux/actions/cartActions";
import {Link, Navigate, useParams, useSearchParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import MetaData from "../../component/layout/MetaData";

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
  const {cartItems} = cart;

  console.log("the cartitem", cartItems);
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    //if logged in then shipping page otherwise signin page using history.push and redirect
  };
  return (
    <>
      <MetaData title="Product Cart" />
      <div className="small-container cart-page">
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          {cartItems.length === 0 ? (
            <div>
              <h1> Nothing added in cart </h1>
              <Link to="/products"> Buy some products</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <>
                <tr>
                  <td>
                    <div className="cart-info">
                      <img src={buy1} alt="cart" />
                      <div>
                        <Link to={`/productdetail/${item.product}`}>
                          <h1>{item.name}</h1>
                        </Link>
                        <small>$ {item.price}</small>
                        <br />
                        <small
                          onClick={() => {
                            removeFromCartHandler(item.product);
                          }}
                        >
                          <li
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                            style={{cursor: "pointer"}}
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
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
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
              </>
            ))
          )}
        </table>
        <div className="total-price">
          <table>
            <tr>
              <td>Total Items </td>
              <td>({cartItems.reduce((acc, item) => acc + item.qty, 0)})</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$10.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>$210.00</td>
            </tr>
          </table>
        </div>
        <button
          className="btn"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
        >
          Checkout &#8594;
        </button>
      </div>
    </>
  );
};

export default Cart;
