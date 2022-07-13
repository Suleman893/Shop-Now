import * as actionTypes from "../constants/userConstant";

export const registerUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        success: true,
      };
    case actionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null, success: false };
    default:
      return state;
  }
};

export const loginUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
    case actionTypes.LOAD_USER_REQUEST:
      return { loading: true, isAuthenticated: false };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        success: true,
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
      return { ...state, error: null, success: false };
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
        ...state,
        loading: false,
        users: action.payload,
      };
    case actionTypes.GET_ALL_USERS_FAIL:
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

export const deleteSpecificUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        delLoading: true,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        delLoading: false,
        delSuccess: true,
      };
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        delLoading: false,
        delError: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        delSuccess: false,

        delError: null,
      };
    default:
      return state;
  }
};

export const editMySelf = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.EDIT_MY_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.EDIT_MY_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      };
    case actionTypes.EDIT_MY_PROFILE_FAIL:
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

export const editMyPassword = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.EDIT_MY_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.EDIT_MY_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      };
    case actionTypes.EDIT_MY_PASSWORD_FAIL:
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
        ...state,
        success: true,
      };
    case actionTypes.ADMIN_EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null, success: false };
    default:
      return state;
  }
};
