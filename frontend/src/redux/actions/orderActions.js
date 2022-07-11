import axios from "axios";
import 
  * as actionTypes
 from "../constants/orderConstants";
import {
 placeOrderApi,
  getOrdersApi,
} from "../../api/Apis";

export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.PLACE_ORDER_REQUEST });
  const currentUser = getState().loginUser.currentUser;
  const cartItems = getState().cart.cartItems;
  try {
    const res = await axios.post(placeOrderApi, {
      token,
      subTotal,
      currentUser,
      cartItems,
    });

    dispatch({ type: actionTypes.PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.PLACE_ORDER_FAIL });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: actionTypes.USER_ORDER_REQUEST,
  });
  try {
    const res = await axios.post(getOrdersApi, { userId: currentUser._id });
    dispatch({ type: actionTypes.USER_ORDER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.USER_ORDER_FAIL, payload: error });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: actionTypes.ALL_ORDERS_REQUEST,
  });
  try {
    const res = await axios.get(getOrdersApi, { userId: currentUser._id });
    dispatch({ type: actionTypes.ALL_ORDERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.ALL_ORDERS_FAIL, payload: error });
  }
};
