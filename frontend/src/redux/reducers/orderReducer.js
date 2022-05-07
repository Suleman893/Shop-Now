import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
} from "../constants/orderConstants";

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case PLACE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserOrdersReducer = (state = {orders: []}, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return {
        loading: true,
      };
    case USER_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case USER_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
