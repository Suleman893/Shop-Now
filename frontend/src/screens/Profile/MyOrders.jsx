import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserOrders } from "../../redux/actions/orderActions";
import "./MyOrders.css";
import { useAlert } from "react-alert";
import Loader from "../../component/Layout/Loader/Loader";
import MetaData from "../../component/Layout/MetaData";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.getUserOrdersReducer
  );

  const { currentUser } = useSelector((state) => state.loginUser);
  useEffect(() => {
    dispatch(getUserOrders(currentUser));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
  console.log("orders", orders);
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
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Qty</th>
                <th>Ship Address</th>
              </tr>
            </thead>
            <tbody>
              {/*  {orders &&
            orders.orderItems.map((curr) => (
                <tr>
                  <td data-label="Product Name">{curr.name}</td>
                  <td data-label="Product Price">{curr.price}</td>
                  <td data-label="Qty">{curr.qty}</td>
                  <td data-label="Ship Address">{orders.shippingAddress.street}</td>
              
                
                </tr>
            )
        )
      }*/}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
