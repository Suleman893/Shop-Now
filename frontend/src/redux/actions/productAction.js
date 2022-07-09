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
  ADMIN_PRODUCT_ALL_REQUEST,
  ADMIN_PRODUCT_ALL_SUCCESS,
  ADMIN_PRODUCT_ALL_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  ADD_REVIEWS_REQUEST,
  ADD_REVIEWS_SUCCESS,
  ADD_REVIEWS_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_EDIT_PRODUCT_FAIL,
  ADMIN_EDIT_PRODUCT_SUCCESS,
  ADMIN_EDIT_PRODUCT_REQUEST,
} from "../constants/productConstants";
import {
  getAllProducts,
  getlatestProducts,
  getProductDetail,
  getFeaturedProductApi,
  searchProductApi,
  getProductByCategoryApi,
  putReviews,
  deleteProductApi,
  updateProductApi,
} from "../../api/Apis";
import { useSelector, useDispatch } from "react-redux";

export const getProduct = (page) => async (dispatch) => {
  console.log("The page", Number(page));
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

export const searchProduct = (setTheCategory) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });
    const { data } = await axios.get(`${searchProductApi}/${setTheCategory}`);
    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data.searchedProduct });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productByCategoryAction =
  (theCategoryToSearch) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_CATEGORY_REQUEST });
      const res = await axios.get(
        `${getProductByCategoryApi}/${theCategoryToSearch}`
      );
      dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const addReviews = (toSend, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: ADD_REVIEWS_REQUEST });
    const res = await axios.put(`${putReviews}`, toSend, { headers });
    console.log("The api res of review", res);
    dispatch({ type: ADD_REVIEWS_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_REVIEWS_FAIL,
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
export const adminAddProduct =
  (newProduct, currentUser) => async (dispatch) => {
    try {
      const headers = { authorization: currentUser };

      dispatch({
        type: ADMIN_CREATE_PRODUCT_REQUEST,
      });
      const res = await axios.post(
        "http://localhost:2000/api/product/admin/product/new",
        newProduct,
        { headers }
      );
      console.log("The res", res);
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

export const getAdminProduct = (currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };

    dispatch({
      type: ADMIN_PRODUCT_ALL_REQUEST,
    });
    const res = await axios.get(
      `http://localhost:2000/api/product/adminproducts`,
      { headers }
    );
    const { data } = res;
    dispatch({
      type: ADMIN_PRODUCT_ALL_SUCCESS,
      payload: { products: data.products },
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_ALL_FAIL,
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
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
    console.log("The id in delete product", id, currentUser);
    const res = await axios.delete(`${deleteProductApi}`, { headers, data });
    console.log("The delete api res", res);
    dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_PRODUCT_FAIL, payload: error });
  }
};

export const editProduct = (updateProduct, currentUser) => async (dispatch) => {
  try {
    const headers = { authorization: currentUser };
    dispatch({ type: ADMIN_EDIT_PRODUCT_REQUEST });
    const res = await axios.put(`${updateProductApi}`, updateProduct, {
      headers,
    });
    console.log("The update ress of review", res);
    dispatch({ type: ADMIN_EDIT_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_EDIT_PRODUCT_FAIL,
    });
  }
};
