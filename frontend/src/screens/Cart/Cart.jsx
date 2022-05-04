import React from "react";
import "./Cart.css";
import buy1 from "../../images/product.jpg";
import {Link} from "react-router-dom";
import MetaData from "../../component/layout/MetaData";
const Cart = () => {
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    <>
    <MetaData title="Product Cart"/>
      <div className="small-container cart-page">
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          <tr>
            <td>
              <div className="cart-info">
                <img src={buy1} alt="cart" />
                <div>
                  <p>Product name</p>
                  <small>Price: $100.00</small>
                  <br />
                  <small>Remove</small>

                  <br />
                </div>
              </div>
            </td>
            <td>
              <input type="number" value="1" />
            </td>
            <td>$100.00</td>
          </tr>

          <tr>
            <td>
              <div className="cart-info">
                <img src={buy1} alt="cart" />
                <div>
                  <p>Product name</p>
                  <small>Price: $100.00</small>
                  <br />

                  <small>Remove</small>

                  <br />
                </div>
              </div>
            </td>
            <td>
              <input type="number" value="1" />
            </td>
            <td>$100.00</td>
          </tr>

          <tr>
            <td>
              <div className="cart-info">
                <img src={buy1} alt="cart" />
                <div>
                  <p>Product name</p>
                  <small>Price: $100.00</small>
                  <br />

                  <small>Remove</small>

                  <br />
                </div>
              </div>
            </td>
            <td>
              <input type="number" value="1" />
            </td>
            <td>$100.00</td>
          </tr>
        </table>

        <div className="total-price">
          <table>
            <tr>
              <td>Subtotal</td>
              <td>$200.00</td>
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
        <Link to="/" className="btn">
          Checkout &#8594;
        </Link>
      </div>
    </>
  );
};

export default Cart;
