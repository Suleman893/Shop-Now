import axios from "axios";
import * as actionTypes from "../constants/orderConstants";
import {
  placeOrderApi,
  getOrdersApi,
  allOrdersApi,
  deleteOrderApi,
} from "../../api/Apis";

export const placeOrder =
  (token, subTotal, currentUser, cartItems) => async (dispatch) => {
    dispatch({ type: actionTypes.PLACE_ORDER_REQUEST });
    const headers = { authorization: currentUser };
    try {
      const res = await axios.post(
        placeOrderApi,
        {
          token,
          subTotal,
          cartItems,
        },
        { headers }
      );

      dispatch({ type: actionTypes.PLACE_ORDER_SUCCESS });
     
    } catch (error) {
      dispatch({
        type: actionTypes.PLACE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getUserOrders = (currentUser) => async (dispatch) => {
  const headers = { authorization: currentUser };

  dispatch({
    type: actionTypes.USER_ORDER_REQUEST,
  });
  try {
    const res = await axios.get(getOrdersApi, { headers });

    dispatch({
      type: actionTypes.USER_ORDER_SUCCESS,
      payload: res.data.orders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = (currentUser) => async (dispatch) => {
  const headers = { authorization: currentUser };

  dispatch({
    type: actionTypes.ALL_ORDERS_REQUEST,
  });
  try {
    const { data } = await axios.get(allOrdersApi, { headers });
    dispatch({ type: actionTypes.ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id, currentUser) => async (dispatch) => {
  const headers = { authorization: currentUser };
  const data = {
    id: id,
  };
  dispatch({
    type: actionTypes.DELETE_ORDER_REQUEST,
  });
  try {
    await axios.delete(deleteOrderApi, { headers, data });
    dispatch({ type: actionTypes.DELETE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ERRORS,
  });
};
