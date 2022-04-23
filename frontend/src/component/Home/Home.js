import React from "react";
import Product from "../Home/Product";
import "./Home.css";
const product = {
  name: "Shirt",
  images: [{url: "https://unsplash.com/photos/npyWFYpHQ94"}],
  price: "2000",
  _id: "12",
};
const Home = () => {
  return (
    <>
      <h1>Banner here </h1>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
