import * as actionTypes from "../constants/orderConstants";

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PLACE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case actionTypes.PLACE_ORDER_FAIL:
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
    case actionTypes.USER_ORDER_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.USER_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case actionTypes.USER_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
