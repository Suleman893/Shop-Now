import * as actionTypes from "../constants/userConstant";

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      // return { loading: true, user: {} };
      return { loading: true };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const loginUserReducer = (state = { user: {} }, action) => {
  console.log("The action.payload", action.payload);
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true, user: {} };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        success: true,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const getAllUsersReducers = (
  state = {
    users: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return {
        users: action.payload,
        loading: false,
      };
    case actionTypes.GET_ALL_USERS_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteSpecificUser = (state = {user:{}}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_USER_REQUEST:
      return { delLoading: true };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        delLoading: false,
        user:{},
        delSuccess: true,
      };
    case actionTypes.DELETE_USER_FAIL:
      return {
        delLoading: false,
        delError: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { delError: null };
    default:
      return;
  }
};
