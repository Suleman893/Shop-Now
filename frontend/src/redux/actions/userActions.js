import * as actionTypes from "../constants/userConstant";
import {
  registerUserApi,
  loginUserApi,
  userCanUpdateItselfApi,
  getAllUsersApi,
  deleteSpecificUserApi,
  adminCanUpdateUser,
  userCanUpdateItsPassword,
} from "../../api/Apis";
import axios from "axios";
import { useSelector } from "react-redux";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: actionTypes.USER_REGISTER_REQUEST });
  try {
    const { data } = await axios.post(registerUserApi, user);
    dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loginUser = (userinfo) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_LOGIN_REQUEST });
    const { data } = await axios.post(loginUserApi, userinfo);

    localStorage.setItem("currentUser", JSON.stringify(data.token));
    localStorage.setItem("loggedInUserInfo", JSON.stringify(data.user));
    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  const { currentUser } = useSelector((state) => state.loginUser);
  const headers = { authorization: currentUser };
  try {
    dispatch({ type: actionTypes.LOAD_USER_REQUEST });
    const { data } = await axios.get(
      "http://localhost:2000/api/user/userInfo",
      { headers }
    );
    localStorage.setItem("loggedInUserInfo", JSON.stringify(data.user));
    dispatch({ type: actionTypes.LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("loggedInUserInfo");
};

//Admins Actions
export const getAllUsers = (currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: actionTypes.GET_ALL_USERS_REQUEST });
    const res = await axios.get(getAllUsersApi, { headers });
    dispatch({
      type: actionTypes.GET_ALL_USERS_SUCCESS,
      payload: res.data.allUsers,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    const data = {
      id: id,
    };
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });
    const res = await axios.delete(`${deleteSpecificUserApi}`, {
      headers,
      data,
    });
    dispatch({ type: actionTypes.DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateMySelf = (updatedUser, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: actionTypes.EDIT_MY_PROFILE_REQUEST });
    const { data } = await axios.put(`${userCanUpdateItselfApi}`, updatedUser, {
      headers,
    });
    dispatch({ type: actionTypes.EDIT_MY_PROFILE_SUCCESS, payload: data.user });
    localStorage.setItem("loggedInUserInfo", JSON.stringify(data.user));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } catch (error) {
    dispatch({
      type: actionTypes.EDIT_MY_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateMyPassword =
  (updatedPassword, currentUser) => async (dispatch) => {
    try {
      const headers = { authorization: currentUser };
      dispatch({ type: actionTypes.EDIT_MY_PASSWORD_REQUEST });
      const { data } = await axios.put(
        `${userCanUpdateItsPassword}`,
        updatedPassword,
        {
          headers,
        }
      );
      dispatch({
        type: actionTypes.EDIT_MY_PASSWORD_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.EDIT_MY_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const adminEditUser = (updatedUser, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: actionTypes.ADMIN_EDIT_PROFILE_REQUEST });
    const { data } = await axios.put(`${adminCanUpdateUser}`, updatedUser, {
      headers,
    });
    dispatch({
      type: actionTypes.ADMIN_EDIT_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_EDIT_PROFILE_FAIL,
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
