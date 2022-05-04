import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
  productReducer,
  productDetailReducer,
  latestProductReducer,
  featuredProductReducer,
} from "./reducers/productReducer";
import {userReducer} from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  latestProducts: latestProductReducer,
  featuredProducts: featuredProductReducer,
  user: userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
