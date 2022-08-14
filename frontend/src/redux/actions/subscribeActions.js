import * as actionTypes from "../constants/subscribeConstants";
import { subscribeEmailApi } from "../../api/Apis";
import axios from "axios";

export const subscribe = (subscribeEmail) => async (dispatch) => {
  dispatch({ type: actionTypes.SUBSCRIBE_REQUEST });
  try {
    console.log("The email", subscribeEmail);
    const res = await axios.post(`${subscribeEmailApi}`, {
      email: subscribeEmail,
    });
    console.log("The res", res);
    dispatch({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: res });
  } catch (error) {
    dispatch({
      type: actionTypes.SUBSCRIBE_FAIL,
      payload: error.response.data.message,
    });
  }
};
