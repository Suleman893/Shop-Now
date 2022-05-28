import "./App.css";
import Header from "./component/layout/Header/Header";
import webfontloader from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Products from "./screens/Products/Products";
import ProductDetail from "./screens/ProductDetail/ProductDetail";
import Cart from "./screens/Cart/Cart";
import Signin from "./screens/Signin/Signin";
import Signup from "./screens/Signup/Signup";
import OrderScreen from "./screens/Order/Order";
import UserList from "./component/AdminPanel/UsersList";
import ProductsList from "./component/AdminPanel/ProductsList";
import OrdersList from "./component/AdminPanel/OrdersList";
import AddProduct from "./component/AdminPanel/AddProduct";
import AdminScreen from "./screens/AdminPanel/AdminScreen";
import About from "./screens/About/About";
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
        <Route exact path="/productdetail/:id" element={<ProductDetail />} />
        <Route exact path="/cart/:id" element={<Cart />} />
        <Route exact path="/orders" element={<OrderScreen />} />
        <Route exact path="/admin" element={<AdminScreen />} />
        <Route path="/admin/userList" element={<UserList />} exact />
        <Route path="/admin/productsList" element={<ProductsList />} exact />
        <Route path="/admin/ordersList" element={<OrdersList />} exact />
        <Route path="/admin/addNewProduct" element={<AddProduct />} exact />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
