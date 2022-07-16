import React from "react";
import MetaData from "../../component/Layout/MetaData";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <MetaData title="Page not found" />
      <div className="container">
        <div className="not-found-wrapper">
          <h2>Opps ! Page not found</h2>
          <h1>404</h1>
          <p>We can't find the page you're looking for</p>
          <Link to="/" className="my-20">
            Go back to home page
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
