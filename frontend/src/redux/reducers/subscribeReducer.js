import * as actionTypes from "../constants/subscribeConstants";

export const subscribeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE_REQUEST:
      return { loading: true };
    case actionTypes.SUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.SUBSCRIBE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null, success: false };
    default:
      return state;
  }
};
