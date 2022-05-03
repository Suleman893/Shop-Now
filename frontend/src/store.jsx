import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducer} from "./redux/reducers/productReducer";
import {productDetailReducer} from "./redux/reducers/productReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
});

let intialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
