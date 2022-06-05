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
  ALL_ADMIN_PRODUCT_REQUEST,
  ALL_ADMIN_PRODUCT_SUCCESS,
  ALL_ADMIN_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

import {
  getAllProducts,
  getlatestProducts,
  getProductDetail,
  getFeaturedProductApi,
} from "../../api/Apis";

export const getProduct = (page) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    const res = await axios.get(
      `http://localhost:2000/api/product/products?page=${page}`
    );
    const { data } = res;
    console.log("The data", data);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: { products: data.products, totalPages: data.totalPages },
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

    const { data } = await axios.get(getlatestProducts);
    dispatch({
      type: LATEST_PRODUCT_SUCCESS,
      payload: data.latestProducts,
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
    const { data } = await axios.get(getFeaturedProductApi);
    dispatch({
      type: FEATURED_PRODUCT_SUCCESS,
      payload: data.featuredProducts,
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
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    console.log("ads");
    const { data } = await axios.get(`${getProductDetail}/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });
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

//Admins
export const adminAddProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_CREATE_PRODUCT_REQUEST,
    });

    const res = await axios.get(
      "http://localhost:2000/api/product/adminproducts",
      newProduct
    );

    dispatch({
      type: ADMIN_CREATE_PRODUCT_SUCCESS,
      payload: { products: res.data },
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ADMIN_PRODUCT_REQUEST,
    });

    const res = await axios.get(
      `http://localhost:2000/api/product/adminproducts`
    );

    const { data } = res;
    dispatch({
      type: ALL_ADMIN_PRODUCT_SUCCESS,
      payload: { products: data.products },
    });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};
