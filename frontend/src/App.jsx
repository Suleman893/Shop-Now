import "./App.css";
import Header from "./component/layout/Header/Header";
import webfontloader from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Products from "./screens/Products/Products";
import ProductsCategory from "./screens/Products/ProductCategory";
import ProductDetail from "./screens/ProductDetail/ProductDetail";
import Cart from "./screens/Cart/Cart";
import Signin from "./screens/Signin/Signin";
import Signup from "./screens/Signup/Signup";
import MyProfile from "./screens/Profile/Profile";
// import UserList from "./component/AdminPanel/UsersList";
// import ProductsList from "./component/AdminPanel/ProductsList";
// import OrdersList from "./component/AdminPanel/OrdersList";
// import AddProduct from "./component/AdminPanel/AddProduct";
import AdminScreen from "./screens/AdminPanel/AdminScreen";
import About from "./screens/About/About";
import AddProduct from "./component/AdminPanel/AddProduct";
function App() {
  useEffect(() => {
    webfontloader.load({
      google: {
        families: ["Montserrat.", "Lato"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/productscategory" element={<ProductsCategory />} />
        <Route exact path="/productdetail/:id" element={<ProductDetail />} />
        <Route exact path="/cart/:id" element={<Cart />} />
        <Route exact path="/myProfile" element={<MyProfile />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/admin/admin/addProduct" element={<AddProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
