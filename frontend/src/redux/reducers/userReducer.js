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
    case actionTypes.LOAD_USER_REQUEST:
      return { loading: true, isAuthenticated: false };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAuthenticated: true,
        user: action.payload,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case actionTypes.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
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
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const deleteSpecificUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.DELETE_USER_REQUEST:
      return { delLoading: true };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        delLoading: false,
        user: {},
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

export const editMySelf = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.EDIT_MY_PROFILE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case actionTypes.EDIT_MY_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case actionTypes.EDIT_MY_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return;
  }
};

export const adminEditUserProfile = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADMIN_EDIT_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case actionTypes.ADMIN_EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return;
  }
};
