import React, { useEffect } from "react";
import "./Home.css";
import MetaData from "../../component/Layout/MetaData";
import {
  getLatestProduct,
  getFeaturedProduct,
} from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Layout/Loader/Loader";
import CallToAction from "../../component/Home/CallToAction";
import Collection from "../../component/Home/Collection";
import HomeProductCard from "../../component/ProductCard/HomeProductCard";
import HeroSection from "../../component/Home/HeroSection";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, latestProducts } = useSelector(
    (state) => state.latestProducts
  );

  const { featuredProducts } = useSelector((state) => state.featuredProducts);

  useEffect(() => {
    dispatch(getLatestProduct());
    dispatch(getFeaturedProduct());
  }, [dispatch]);

  return (
    <React.Fragment>
      <MetaData title="Shop now" />
      <Header />
      <HeroSection />
      <div className="container">
        <h2 className="page-title ">Latest Products</h2>
        <div className="home-page-products my-20">
          {loading ? (
            <Loader />
          ) : (
            latestProducts.map((product) => (
              <HomeProductCard product={product} />
            ))
          )}
        </div>
      </div>
      <Collection />
      <div className="container">
        <h2 className="page-title ">Featured Products</h2>
        <div className="home-page-products my-20">
          {loading ? (
            <Loader />
          ) : (
            latestProducts.map((product) => (
              <HomeProductCard product={product} />
            ))
          )}
        </div>
      </div>
      <CallToAction />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
