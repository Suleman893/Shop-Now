import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERRORS,
  EDIT_USER_PROFILE_REQUEST,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_FAIL,
} from "../constants/userConstant";

import {
  registerUserApi,
  loginUserApi,
  getAllUsersApi,
  deleteSpecificUser,
  updateUserApi,
} from "../../api/Apis";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await axios.post(registerUserApi, user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error });
  }
};

export const loginUser = (userinfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(loginUserApi, userinfo);
    console.log("The data", data);
    localStorage.setItem("loggedInUserInfo", JSON.stringify(data.user));
    localStorage.setItem("currentUser", JSON.stringify(data.token));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error });
  }
};

export const logoutUser = () => () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("loggedInUserInfo");
};

export const getAllUsers = (currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const { data } = await axios.get(getAllUsersApi, { headers });
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
  }
};

export const deleteUser = (id, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    const data = {
      id: id,
    };
    dispatch({ type: DELETE_USER_REQUEST });
    console.log("The id", id, currentUser);
    const res = await axios.delete(`${deleteSpecificUser}`, { headers, data });
    console.log("The delete api res", res);

    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const editUserProfile =
  (updatedUser, currentUser) => async (dispatch) => {
    try {
      const headers = { authorization: currentUser };
      dispatch({ type: EDIT_USER_PROFILE_REQUEST });
      const res = await axios.put(`${updateUserApi}`, updatedUser, { headers });
      console.log("The update ress of review", res);
      dispatch({ type: EDIT_USER_PROFILE_SUCCESS });
    } catch (error) {
      dispatch({
        type: EDIT_USER_PROFILE_FAIL,
      });
    }
  };
