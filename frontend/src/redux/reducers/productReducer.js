import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  LATEST_PRODUCT_REQUEST,
  LATEST_PRODUCT_SUCCESS,
  LATEST_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  FEATURED_PRODUCT_REQUEST,
  FEATURED_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {loading: true, products: []};
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        // productsCount: action.payload.productsCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const latestProductReducer = (state = {latestProducts: []}, action) => {
  switch (action.type) {
    case LATEST_PRODUCT_REQUEST:
      return {loading: true, latestProducts: []};
    case LATEST_PRODUCT_SUCCESS:
      return {
        loading: false,
        latestProducts: action.payload,
        // productsCount: action.payload.productsCount,
      };
    case LATEST_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const featuredProductReducer = (
  state = {featuredProduct: []},
  action
) => {
  switch (action.type) {
    case FEATURED_PRODUCT_REQUEST:
      return {loading: true, featuredProduct: []};
    case FEATURED_PRODUCT_SUCCESS:
      return {loading: false, featuredProduct: action.payload};
    case FEATURED_PRODUCT_FAIL:
      return {loading: false, error: action.payload};
    case CLEAR_ERRORS:
      return {...state, error: null};
    default:
      return state;
  }
};

export const productDetailReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {loading: true, ...state};
    case PRODUCT_DETAIL_SUCCESS:
      return {loading: false, product: action.payload};
    case PRODUCT_DETAIL_FAIL:
      return {loading: false, error: action.payload};
    case CLEAR_ERRORS:
      return {...state, error: null};
    default:
      return state;
  }
};
