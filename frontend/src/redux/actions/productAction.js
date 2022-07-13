import axios from "axios";
import * as actionTypes from "../constants/productConstants";
import {
  getlatestProductsApi,
  getProductDetailApi,
  getFeaturedProductApi,
  searchProductApi,
  getProductByCategoryApi,
  putReviewsApi,
  deleteProductApi,
  updateProductApi,
  adminAddNewProductApi,
  adminGetAllProductsApi,
} from "../../api/Apis";

export const getProduct = (page) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.ALL_PRODUCT_REQUEST,
    });
    const res = await axios.get(
      `http://localhost:2000/api/product/products?page=${page}`
    );
    const { data } = res;
    dispatch({
      type: actionTypes.ALL_PRODUCT_SUCCESS,
      payload: { products: data.products, totalPages: data.totalPages },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getLatestProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LATEST_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(getlatestProductsApi);
    dispatch({
      type: actionTypes.LATEST_PRODUCT_SUCCESS,
      payload: data.latestProducts,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LATEST_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getFeaturedProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FEATURED_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(getFeaturedProductApi);
    dispatch({
      type: actionTypes.FEATURED_PRODUCT_SUCCESS,
      payload: data.featuredProducts,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FEATURED_PRODUCT_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`${getProductDetailApi}/${id}`);
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const searchProduct = (setTheCategory) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SEARCH_PRODUCT_REQUEST });
    const { data } = await axios.get(`${searchProductApi}/${setTheCategory}`);
    dispatch({
      type: actionTypes.SEARCH_PRODUCT_SUCCESS,
      payload: data.searchedProduct,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productByCategoryAction =
  (theCategoryToSearch) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_CATEGORY_REQUEST });
      const res = await axios.get(
        `${getProductByCategoryApi}/${theCategoryToSearch}`
      );
      dispatch({
        type: actionTypes.PRODUCT_CATEGORY_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const addReviews = (toSend, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: actionTypes.ADD_REVIEWS_REQUEST });
    const res = await axios.put(`${putReviewsApi}`, toSend, { headers });
    dispatch({ type: actionTypes.ADD_REVIEWS_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Admins Actions
export const adminAddProduct =
  (newProduct, currentUser) => async (dispatch) => {
    try {
      const headers = { authorization: currentUser };

      dispatch({
        type: actionTypes.ADMIN_CREATE_PRODUCT_REQUEST,
      });
      const res = await axios.post(`${adminAddNewProductApi}`, newProduct, {
        headers,
      });
      dispatch({
        type: actionTypes.ADMIN_CREATE_PRODUCT_SUCCESS,
        payload: { products: res.data },
      });
    } catch (error) {
      console.log("The error", error.response.data.message);
      dispatch({
        type: actionTypes.ADMIN_CREATE_PRODUCT_FAIL,
        payload: error.response.data.message,
        //error.response.data.message means the api error message, like we sending from the backend error message
      });
    }
  };

export const getAdminProduct = (currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };

    dispatch({
      type: actionTypes.ADMIN_PRODUCT_ALL_REQUEST,
    });
    const res = await axios.get(`${adminGetAllProductsApi}`, { headers });
    const { data } = res;
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_ALL_SUCCESS,
      payload: { products: data.products },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_ALL_FAIL,
      payload: error.response.data.message,
      //error.response.data.message means the api error message, like we sending from the backend error message
    });
  }
};

export const deleteProduct = (id, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    const data = {
      id: id,
    };
    dispatch({ type: actionTypes.ADMIN_DELETE_PRODUCT_REQUEST });
    const res = await axios.delete(`${deleteProductApi}`, { headers, data });
    dispatch({
      type: actionTypes.ADMIN_DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editProduct = (updateProduct, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: actionTypes.ADMIN_EDIT_PRODUCT_REQUEST });
    const res = await axios.put(`${updateProductApi}`, updateProduct, {
      headers,
    });
    dispatch({ type: actionTypes.ADMIN_EDIT_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_EDIT_PRODUCT_FAIL,
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
