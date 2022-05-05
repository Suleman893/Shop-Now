import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      // return {loading: true, user: {}};
      return {loading: true};
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {...state, error: null};
    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      // return {loading: true, user: {}};
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {...state, error: null};
    default:
      return state;
  }
};
