import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserOrders } from "../../redux/actions/orderActions";
import "./MyOrders.css";
import { useAlert } from "react-alert";
import Loader from "../../component/Layout/Loader/Loader";
import MetaData from "../../component/Layout/MetaData";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.getUserOrders
  );

  const { currentUser } = useSelector((state) => state.loginUser);
  useEffect(() => {
    dispatch(getUserOrders(currentUser));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div>
      <MetaData title="My Orders" />

      <div className="table-container">
        {loading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Total Bill</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Qty</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((curr) => (
                  <tr>
                    <td data-label="Total Bill">{curr.orderAmount}</td>
                    {curr.orderItems.map((c) => (
                      <Fragment>
                        <td data-label="Product Name">{c.name}</td>
                        <td data-label="Product Price">{c.price}</td>
                        <td data-label="Qty">{c.qty}</td>
                      </Fragment>
                    ))}
                    <td data-label="City">{curr.shippingAddress.city}</td>
                    <td data-label="Country">{curr.shippingAddress.country}</td>
                  </tr>
                ))
              ) : (
                <h1>
                  {" "}
                  NO orders yet <Link to="/products"> Buy some products </Link>
                </h1>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
