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
} from "../constants/userConstant";

import {
  registerUserApi,
  loginUserApi,
  getAllUsersApi,
  deleteSpecificUser,
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

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(loginUserApi, user);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem("currentUser", JSON.stringify(data.token));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error });
  }
};

export const logoutUser = () => () => {
  localStorage.removeItem("currentUser");
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const { data } = await axios.get(getAllUsersApi);
    console.log("the api dd", data);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    await axios.delete(deleteSpecificUser, id);
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
