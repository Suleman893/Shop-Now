import axios from "axios";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
} from "../constants/orderConstants";
import {
  placeOrder as placeOrderApi,
  getOrders as getOrdersApi,
} from "../../api/Apis";

export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  const currentUser = getState().loginUser.currentUser;
  const cartItems = getState().cart.cartItems;
  try {
    const res = await axios.post(placeOrderApi, {
      token,
      subTotal,
      currentUser,
      cartItems,
    });

    dispatch({ type: PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAIL });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: USER_ORDER_REQUEST,
  });
  try {
    const res = await axios.post(getOrdersApi, { userId: currentUser._id });
    dispatch({ type: USER_ORDER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: USER_ORDER_FAIL, payload: error });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: ALL_ORDERS_REQUEST,
  });
  try {
    const res = await axios.get(getOrdersApi, { userId: currentUser._id });
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error });
  }
};
