import * as actionTypes from "../constants/cartConstants";
import { getProductDetailApi } from "../../api/Apis";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${getProductDetailApi}/${id}`);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.productName,
      price: data.product.price,
      countInStock: data.product.stock,
      rating: data.product.ratings,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
