import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
//Importing all reducers
import {
  productReducer,
  productDetailReducer,
  latestProductReducer,
  featuredProductReducer,
  adminProductReducer,
  adminAddProductReducer,
  searchProductReducer,
  productByCategory,
  deleteSpecificProductReducer,
  addReviewsReducer,
} from "./reducers/productReducer";
import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducers,
  deleteSpecificUser,
  editMySelf,
  adminEditUserProfile
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  adminGetAllOrderReducer,
} from "./reducers/orderReducer";

//Combine Reducers
const rootReducer = combineReducers({
  //Users
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  getAllUsers: getAllUsersReducers,
  // editMySelf:editMySelf,
  // adminEditUserProfile:adminEditUserProfile,
  // deleteSpecificUser:deleteSpecificUser,

  //Products
  products: productReducer,
  productDetail: productDetailReducer,
  latestProducts: latestProductReducer,
  featuredProducts: featuredProductReducer,
  adminPanelProducts: adminProductReducer,
  adminAddProduct: adminAddProductReducer,
  searchProduct: searchProductReducer,
  productByCategory: productByCategory,
  addReviews: addReviewsReducer,
  // deleteSpecificProductReducer:deleteSpecificProductReducer

  //Cart
  cart: cartReducer,
  
  //Order
  placeOrder: placeOrderReducer,
  getUserOrders: getUserOrdersReducer,
  adminGetAllOrder: adminGetAllOrderReducer,
});

//LocalStorage
const currentUserFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const currentUserInfoFromStorage = localStorage.getItem("loggedInUserInfo")
  ? JSON.parse(localStorage.getItem("loggedInUserInfo"))
  : null;

let initialState = {
  loginUser: {
    loggedInUserInfo: currentUserInfoFromStorage,
    currentUser: currentUserFromStorage,
  },
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
