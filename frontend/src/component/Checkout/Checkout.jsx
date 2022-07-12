import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, clearErrors } from "../../redux/actions/orderActions";
import { useEffect } from "react";
import { useAlert } from "react-alert";

const Checkout = ({ subTotal }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUser);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //orderState
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  //
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal, currentUser, cartItems));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success) {
      alert.success("Product added successfully");
      dispatch(clearErrors());
    }
  }, [error, alert, success]);

  return (
    <>
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51KwisUAehaVXR4RDRowYrQHZDZGMSY5AMf8ssCH5l4ut7a0bZDHk5jtSF4fWyAaDHYNw8ovHxPJthWjMojMycoj400XcN3HN9P"
        currency="PKR"
      >
        <button>Pay now</button>
      </StripeCheckout>
    </>
  );
};

export default Checkout;
