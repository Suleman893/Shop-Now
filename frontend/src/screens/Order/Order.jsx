import React, {useEffect} from "react";
import {getUserOrders} from "../../redux/actions/orderActions";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../../component/layout/Loader/Loader";

const OrderScreen = () => {
  const orderState = useSelector((state) => state.getUserOrdersReducer);
  console.log("The order", orderState);
  const {loading, error, orders} = orderState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  });
  return (
    <>
      <h1>Order screen</h1>
      {loading && <Loader />}
      {error && <h1>Error Component</h1>}
      {orders && <h1>Orders</h1>}
    </>
  );
};

export default OrderScreen;
