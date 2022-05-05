import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

//Importing all reducers
import {
  productReducer,
  productDetailReducer,
  latestProductReducer,
  featuredProductReducer,
} from "./reducers/productReducer";
import {registerUserReducer, loginUserReducer} from "./reducers/userReducer";
import {cartReducer} from "./reducers/cartReducer";

const reducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  productDetail: productDetailReducer,
  latestProducts: latestProductReducer,
  featuredProducts: featuredProductReducer,
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
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
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
