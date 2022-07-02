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
} from "./reducers/productReducer";
import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducers,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  placeOrderReducer,
  getUserOrdersReducer,
} from "./reducers/orderReducer";

//Combine Reducers
const rootReducer = combineReducers({
  //Users
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  getAllUsersReducers: getAllUsersReducers,
  //Product
  products: productReducer,
  productDetail: productDetailReducer,
  latestProducts: latestProductReducer,
  featuredProducts: featuredProductReducer,
  adminPanelProducts: adminProductReducer,
  adminAddProductReducer: adminAddProductReducer,
  //Cart
  cart: cartReducer,
  //Order
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
});

//LocalStorage
const currentUserFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

let initialState = {
  loginUser: {
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
