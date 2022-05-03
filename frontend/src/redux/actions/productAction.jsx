import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constants/productConstants";
import {getAllProducts} from "../../api/Apis";
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    const {data} = await axios.get(getAllProducts);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAIL_REQUEST});
    const {data} = await axios.get(`getProductDetail/${id}`);

    dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data.product});
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
