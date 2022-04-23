import "./App.css";
import Header from "./component/layout/Header/Header";
import webfontloader from "webfontloader";
import {useEffect} from "react";
import Footer from "./component/layout/Footer/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./component/Home/Home";
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
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
