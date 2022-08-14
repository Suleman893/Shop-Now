import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, clearErrors } from "../../redux/actions/orderActions";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { clearCart } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const Checkout = ({ subTotal }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUser);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //orderState
  const orderState = useSelector((state) => state.placeOrder);
  const { error, success } = orderState;
  //
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal, currentUser, cartItems));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Order placed");
      dispatch(clearErrors());
      dispatch(clearCart());
      navigate("/myOrders");
    }
  }, [dispatch, error, alert, success]);

  return (
    <React.Fragment>
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51KwisUAehaVXR4RDRowYrQHZDZGMSY5AMf8ssCH5l4ut7a0bZDHk5jtSF4fWyAaDHYNw8ovHxPJthWjMojMycoj400XcN3HN9P"
        currency="PKR"
      >
        <div style={{ width: "15%" }}>
          <button disabled={cartItems.length == 0} className="btn">
            Checkout <ShoppingCartCheckoutIcon style={{ fontSize: "17px" }} />
          </button>
        </div>
      </StripeCheckout>
    </React.Fragment>
  );
};

export default Checkout;
