import * as actionTypes from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.ALL_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case actionTypes.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        // productsCount: action.payload.productsCount,
      };
    case actionTypes.ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const latestProductReducer = (
  state = { latestProducts: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.LATEST_PRODUCT_REQUEST:
      return { loading: true, latestProducts: [] };
    case actionTypes.LATEST_PRODUCT_SUCCESS:
      return {
        loading: false,
        latestProducts: action.payload,
        // productsCount: action.payload.productsCount,
      };
    case actionTypes.LATEST_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const featuredProductReducer = (
  state = { featuredProducts: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.FEATURED_PRODUCT_REQUEST:
      return { loading: true, featuredProducts: [] };
    case actionTypes.FEATURED_PRODUCT_SUCCESS:
      return { loading: false, featuredProducts: action.payload };
    case actionTypes.FEATURED_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const searchProductReducer = (
  state = { searchedProducts: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.SEARCH_PRODUCT_REQUEST:
      return { loading: true, searchedProducts: [] };
    case actionTypes.SEARCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        searchedProducts: action.payload,
        // productsCount: action.payload.productsCount,
      };
    case actionTypes.SEARCH_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productByCategoryReducer = (
  state = { categoryProducts: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CATEGORY_REQUEST:
      return { loading: true, categoryProducts: [] };
    case actionTypes.PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        categoryProducts: action.payload,
      };
    case actionTypes.PRODUCT_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addReviewsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADD_REVIEWS_REQUEST:
      return { loading: true };
    case actionTypes.ADD_REVIEWS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.ADD_REVIEWS_FAIL:
      return {
        loading: false,
        reviewerror: action.payload.error,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, reviewerror: null, success: false };
    default:
      return state;
  }
};

///Admins
export const adminAddProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case actionTypes.ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
        // productsCount: action.payload.productsCount,
      };
    case actionTypes.ADMIN_CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const adminProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_PRODUCT_ALL_REQUEST:
      return { loading: true, products: [] };
    case actionTypes.ADMIN_PRODUCT_ALL_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        // productsCount: action.payload.productsCount,
      };
    case actionTypes.ADMIN_PRODUCT_ALL_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteSpecificProductReducer = (
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.ADMIN_DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        delLoading: true,
      };
    case actionTypes.ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        delLoading: false,
        delSuccess: true,
      };
    case actionTypes.ADMIN_DELETE_PRODUCT_FAIL:
      return {
        ...state,
        delLoading: false,
        delError: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        delSuccess: false,
        delError: null,
      };
    default:
      return state;
  }
};

export const adminEditProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADMIN_EDIT_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        ...state,
        success: true,
      };
    case actionTypes.ADMIN_EDIT_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null, success: false };
    default:
      return state;
  }
};
