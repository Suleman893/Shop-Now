import React, { useEffect, useState } from "react";
import "./Products.css";
import buy1 from "../../images/product.jpg";
import buy2 from "../../images/product2.jpg";
import ReactStars from "react-rating-stars-component";
import {
  clearErrors,
  getProduct,
  searchProduct,
  productByCategoryAction,
} from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import HeadShake from "react-reveal/HeadShake";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";

const Products = () => {
  const alert = useAlert();

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const { loading, error, products, totalPages } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const [setTheCategory, setSetTheCategory] = useSearchParams();
  const { categoryProducts } = useSelector((state) => state.productByCategory);
  const { searchedProducts } = useSelector((state) => state.searchProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(pageNumber));
    setCurrentProduct(products);
    setNumberOfPages(totalPages);
    scroll.scrollTo(1);
  }, [pageNumber, setPageNumber, error, alert]);

  const theCategoryToSearch = setTheCategory.get("categorytype");

  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber((numberOfPages - 1, pageNumber + 1));
  };
  //Handlers
  const categoryHandlerOne = () => {
    setSetTheCategory({ categorytype: "Mens Fashion" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };

  const categoryHandlerTwo = () => {
    setSetTheCategory({ categorytype: "Women Fashion" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };
  const categoryHandlerThree = () => {
    setSetTheCategory({ categorytype: "Electronic Devices" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };
  const categoryHandlerFour = () => {
    setSetTheCategory({ categorytype: "Home & Lifestyle" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };
  const categoryHandlerFive = () => {
    setSetTheCategory({ categorytype: "Sports & Outdoor" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };
  const categoryHandlerSix = () => {
    setSetTheCategory({ categorytype: "Automotive & Motorbike" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };

  const categoryHandlerSeven = () => {
    setSetTheCategory({ categorytype: "Groceries & Pets" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };
  const categoryHandlerEight = () => {
    setSetTheCategory({ categorytype: "Health & Beauty" });
    dispatch(productByCategoryAction(theCategoryToSearch));
  };

  const setProductSearchHandler = (e) => {
    let productSearchName = e.target.value;
    dispatch(searchProduct(productSearchName));
  };

  return (
    <>
      <MetaData title="Product" />
      <div className="container">
        <div className="product-top">
          <h2 className="page-title">Products</h2>
          <input
            type="text"
            name="searchbar"
            placeholder="Search product..."
            className="product-search"
            onChange={setProductSearchHandler}
          />
        </div>
        <div className="row">
          <div className="left">
            <div className="filter-section">
              <h5>Categories</h5>
              <ul>
                <li onClick={categoryHandlerOne}>Men Fashion</li>
                <li onClick={categoryHandlerTwo}>Women Fashion</li>
                <li onClick={categoryHandlerThree}>Electronic Devices</li>
                <li onClick={categoryHandlerFour}>Home & Lifestyle</li>
                <li onClick={categoryHandlerFive}>Sports & Outdoor</li>
                <li onClick={categoryHandlerSix}>Automotive & Motorbike</li>
                <li onClick={categoryHandlerSeven}>Groceries & Pets</li>
                <li onClick={categoryHandlerEight}>Health & Beauty</li>
              </ul>
            </div>
          </div>

          <div className="right">
            {loading ? (
              <Loader />
            ) : (
              products.map((product) => (
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
                        <span className="product-card-price">
                          Rs {product.price}
                        </span>
                      </div>
                    </Link>
                  </div>
                </HeadShake>
              ))
            )}
          </div>
        </div>

        <div className="page-btn">
          <button onClick={goToPrevious}>Back</button>
          {pages.map((pageIndex) => (
            <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={goToNext}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Products;
