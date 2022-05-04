import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  LATEST_PRODUCT_REQUEST,
  LATEST_PRODUCT_SUCCESS,
  LATEST_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  FEATURED_PRODUCT_REQUEST,
  FEATURED_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_FAIL,
} from "../constants/productConstants";

import {
  getAllProducts,
  getlatestProducts,
  getProductDetail,
  getFeaturedProductApi,
} from "../../api/Apis";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    const {data} = await axios.get(getAllProducts);
    console.log("the data", data);
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

export const getLatestProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: LATEST_PRODUCT_REQUEST,
    });

    const {data} = await axios.get(getlatestProducts);
    console.log("the latestProducts", data);
    dispatch({
      type: LATEST_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LATEST_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getFeaturedProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: FEATURED_PRODUCT_REQUEST,
    });

    const {data} = await axios.get(getFeaturedProductApi);
    console.log("the repsonse from ", data);
    dispatch({
      type: FEATURED_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FEATURED_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAIL_REQUEST});

    const {data} = await axios.get(`${getProductDetail}/${id}`);

    dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data});
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
