import React, { useEffect } from "react";
import "./Home.css";
import MetaData from "../../component/Layout/MetaData";
import {
  getLatestProduct,
  getFeaturedProduct,
} from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Layout/Loader/Loader";
import HeadShake from "react-reveal/HeadShake";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import buy2 from "../../images/product2.jpg";

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
      <div className="banner-img">
        <div className="banner-wrapper">
          <div className="banner-img-content">
            <h2>Keep The Fashion Vibe Alive</h2>
            <p>Explore our products</p>
            <button>Dive Right In</button>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="page-title ">Latest Products</h2>
        <div className="home-page-products my-20">
          {loading ? (
            <Loader />
          ) : (
            latestProducts.map((product) => (
              <HeadShake>
                <div className="product-card">
                  <Link to={`/productdetail/${product._id}`}>
                    <div className="product-card-img">
                      <img src={buy2} alt="product-card" />
                    </div>
                    <div className="product-card-content">
                      <h1>{product.productName}</h1>
                      <p>{product.category}</p>
                      <div className="no-of-reviews">
                        <ReactStars
                          edit={false}
                          color="rgba(20,20,20,0.1)"
                          activeColor="#ffd700"
                          size={window.innerWidth < 600 ? 20 : 25}
                          value={product.ratings}
                          isHalf={true}
                        />
                        <p>({product.numOfReviews} reviews) </p>
                      </div>
                      <div className="product-card-price">
                        Rs {product.price}
                      </div>
                    </div>
                  </Link>
                </div>
              </HeadShake>
            ))
          )}
        </div>

        <h2 className="page-title ">Featured Products</h2>
        <div className="home-page-products my-20">
          {loading ? (
            <Loader />
          ) : (
            latestProducts.map((product) => (
              <HeadShake>
                <div className="product-card">
                  <Link to={`/productdetail/${product._id}`}>
                    <div className="product-card-img">
                      <img src={buy2} alt="product-card" />
                    </div>
                    <div className="product-card-content">
                      <h1>{product.productName}</h1>
                      <p>{product.category}</p>
                      <div className="no-of-reviews">
                        <ReactStars
                          edit={false}
                          color="rgba(20,20,20,0.1)"
                          activeColor="#ffd700"
                          size={window.innerWidth < 600 ? 20 : 25}
                          value={product.ratings}
                          isHalf={true}
                        />
                        <p>({product.numOfReviews} reviews) </p>
                      </div>
                      <div className="product-card-price">
                        Rs {product.price}
                      </div>
                    </div>
                  </Link>
                </div>
              </HeadShake>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
