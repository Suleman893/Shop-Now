import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";
import {registerUserApi, loginUserApi} from "../../api/Apis";
import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  dispatch({type: USER_REGISTER_REQUEST});
  try {
    const {data} = await axios.post(registerUserApi, user);
   
    dispatch({type: USER_REGISTER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({type: USER_REGISTER_FAIL, payload: error});
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST});
    const {data} = await axios.post(loginUserApi, user);
    dispatch({type: USER_LOGIN_SUCCESS, payload: data.user});
    localStorage.setItem("currentUser", JSON.stringify(data));
  } catch (error) {
    dispatch({type: USER_LOGIN_FAIL, payload: error});
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
