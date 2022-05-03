import React, {useEffect} from "react";
import HomeProducts from "./HomeProducts";
import "./Home.css";
import MetaData from "../../component/layout/MetaData";

import {getProduct} from "../../redux/actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../../component/layout/Loader/Loader";
import Banner from "../../component/Banner/Banner";
import Offer from "../../component/Offer/Offer";
const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products, productsCount} = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce" />
          <Banner />
          <HomeProducts />
          <div className="container" id="container">
            {products &&
              products.map((currProduct) => (
                <HomeProducts currProduct={currProduct} />
              ))}
          </div>
          <Offer />
        </>
      )}
    </>
  );
};

export default Home;
