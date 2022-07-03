import * as actionTypes from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (pro) => pro.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((pro) =>
            pro.product === existItem.product ? item : pro
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (pro) => pro.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
