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
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
