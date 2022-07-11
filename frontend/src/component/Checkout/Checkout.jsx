import React from "react";
import Loader from "../layout/Loader/Loader";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/actions/orderActions";

const Checkout = ({ subTotal }) => {
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const dispatch = useDispatch();
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
  };
  return (
    <>
      {loading && <Loader />}
      {error && <h1>Error component</h1>}
      {success && <h1>Success component</h1>}
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51KwisUAehaVXR4RDRowYrQHZDZGMSY5AMf8ssCH5l4ut7a0bZDHk5jtSF4fWyAaDHYNw8ovHxPJthWjMojMycoj400XcN3HN9P"
        currency="AED"
      >
        <button>Pay now</button>
      </StripeCheckout>
    </>
  );
};

export default Checkout;
