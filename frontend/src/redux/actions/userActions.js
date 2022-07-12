import * as actionTypes from "../constants/userConstant";

import {
  registerUserApi,
  loginUserApi,
  getAllUsersApi,
  deleteSpecificUserApi,
  updateUserApi,
} from "../../api/Apis";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
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
    localStorage.setItem("loggedInUserInfo", JSON.stringify(data.user));
    localStorage.setItem("currentUser", JSON.stringify(data.token));

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

export const editUserProfile =
  (updatedUser, currentUser) => async (dispatch) => {
    try {
      const headers = { authorization: currentUser };
      dispatch({ type: actionTypes.EDIT_USER_PROFILE_REQUEST });
      const res = await axios.put(`${updateUserApi}`, updatedUser, { headers });
      dispatch({ type: actionTypes.EDIT_USER_PROFILE_SUCCESS });
    } catch (error) {
      dispatch({
        type: actionTypes.EDIT_USER_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Admins Actions
export const getAllUsers = (currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: actionTypes.GET_ALL_USERS_REQUEST });
    const { data } = await axios.get(getAllUsersApi, { headers });
    dispatch({ type: actionTypes.GET_ALL_USERS_SUCCESS, payload: data });
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

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ERRORS,
  });
};
