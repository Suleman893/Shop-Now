import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webfontloader from "webfontloader";
import { useDispatch, useSelector } from "react-redux";
//Screens
import Home from "./screens/Home/Home";
import Products from "./screens/Products/Products";
import ProductsCategory from "./screens/Products/ProductCategory";
import ProductDetail from "./screens/ProductDetail/ProductDetail";
import Cart from "./screens/Cart/Cart";
import Signin from "./screens/Signin/Signin";
import Signup from "./screens/Signup/Signup";
import MyProfile from "./screens/Profile/Profile";
import MyOrders from "./screens/Profile/MyOrders";
import NotFound from "./screens/NotFound/NotFound";
import AdminScreen from "./screens/AdminPanel/AdminScreen";
import About from "./screens/About/About";
//ProtectedRouteComponent
import ProtectedRoute from "./ProtectedRoute";
import store from "../src/redux/store";
import { loadUser } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    webfontloader.load({
      google: {
        families: ["Montserrat.", "Lato"],
      },
    });

    store.dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/productscategory" element={<ProductsCategory />} />
        <Route exact path="/productdetail/:id" element={<ProductDetail />} />
        <Route exact path="/cart/:id" element={<Cart />} />
        <Route exact path="/about" element={<About />} />
        <Route
          exact
          path="/myProfile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/myOrders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
