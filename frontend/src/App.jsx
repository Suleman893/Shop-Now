import "./App.css";
import Header from "./component/layout/Header/Header";
import webfontloader from "webfontloader";
import {useEffect} from "react";
import Footer from "./component/layout/Footer/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./screens/Home/Home";
import Products from "./screens/Products/Products";
import ProductDetail from "./screens/ProductDetail/ProductDetail";
import Cart from "./screens/Cart/Cart";
import Signin from "./screens/Signin/Signin";
import Signup from "./screens/Signup/Signup";

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
      <div className="header">
        <div className="container">
          <Header />
          <Routes>
            <Route exact path="/products" element={<Products />} />
            <Route
              exact
              path="/productdetail/:id"
              element={<ProductDetail />}
            />
            <Route exact path="/cart/:id" element={<Cart />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
