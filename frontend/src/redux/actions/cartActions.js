import * as actionTypes from "../constants/cartConstants";
import {getProductDetail} from "../../api/Apis";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`${getProductDetail}/${id}`);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      countInStock: data.product.stock,
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
