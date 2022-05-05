import React, {useEffect} from "react";
import HomeProducts from "./HomeProducts";
import "./Home.css";
import MetaData from "../../component/layout/MetaData";
import Banner from "../../component/Banner/Banner";
import {
  getLatestProduct,
  getFeaturedProduct,
} from "../../redux/actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../../component/layout/Loader/Loader";
import Offer from "../../component/Offer/Offer";

const Home = () => {
  const dispatch = useDispatch();
  var {loading, error, latestProducts, productsCount} = useSelector(
    (state) => state.latestProducts
  );

  var {loading, error, featuredProduct} = useSelector(
    (state) => state.featuredProducts
  );
  useEffect(() => {
    dispatch(getLatestProduct());
    dispatch(getFeaturedProduct());
  }, [dispatch]);

  console.log("The products in home page", latestProducts);
  return (
    <>
      <MetaData title="Shop Now" />
      <Banner />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container" id="container">
            {latestProducts && (
              <HomeProducts
                latestProducts={latestProducts}
                featuredProduct={featuredProduct}
              />
            )}
          </div>
          <Offer />
        </>
      )}
    </>
  );
};

export default Home;
