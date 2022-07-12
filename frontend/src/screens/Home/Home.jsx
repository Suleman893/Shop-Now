import React, { useEffect } from "react";

import "./Home.css";
import MetaData from "../../component/Layout/MetaData";
import {
  getLatestProduct,
  getFeaturedProduct,
} from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  var { loading, error, latestProducts, productsCount } = useSelector(
    (state) => state.latestProducts
  );

  var { loading, error, featuredProduct } = useSelector(
    (state) => state.featuredProducts
  );
  useEffect(() => {
    dispatch(getLatestProduct());
    dispatch(getFeaturedProduct());
  }, [dispatch]);

  return <h1>home</h1>;
};

export default Home;
