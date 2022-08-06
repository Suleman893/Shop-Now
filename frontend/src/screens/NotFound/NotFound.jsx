import React from "react";
import MetaData from "../../component/Layout/MetaData";
import "./NotFound.css";
import { Link } from "react-router-dom";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const NotFound = () => {
  return (
    <React.Fragment>
      <MetaData title="Page not found" />
      <Header />
      <div className="container">
        <div className="not-found-content">
          <h2>Opps ! Page not found</h2>
          <h1>404</h1>
          <p>We can't find the page you're looking for</p>
          <div className="not-found-btn">
            <button className="btn my-20">
              <Link to="/">Go back to home page</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
