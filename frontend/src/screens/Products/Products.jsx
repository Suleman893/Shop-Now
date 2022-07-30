import React, { useEffect, useState } from "react";
import "./Products.css";

import {
  clearErrors,
  getProduct,
  searchProduct,
  productByCategoryAction,
} from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import HeadShake from "react-reveal/HeadShake";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";
import ProductCard from "../../component/ProductCard/ProductCard";

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
  // const [setTheCategory, setSetTheCategory] = useSearchParams();
  const { categoryProducts } = useSelector((state) => state.productByCategory);
  const { searchedProducts } = useSelector((state) => state.searchProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(pageNumber));
    setCurrentProduct(
      searchedProducts.length
        ? searchedProducts
        : categoryProducts.length
        ? categoryProducts
        : products
    );
    setNumberOfPages(totalPages);
    scroll.scrollTo(1);
  }, [
    pageNumber,
    setPageNumber,
    error,
    alert,
    searchedProducts,
    categoryProducts,
  ]);

  console.log("The categoryProducts", categoryProducts);
  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber((numberOfPages - 1, pageNumber + 1));
  };

  const categoriesArray = [
    "Men Fashion",
    "Women Fashion",
    "Electronic Devices",
    "Home & Lifestyle",
    "Sports & Outdoor",
    "Automotive & Motorbike",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  const [searchCategory, setSearchCategory] = useState("");

  const setProductSearchHandler = (e) => {
    let productSearchName = e.target.value;
    dispatch(searchProduct(productSearchName));
  };

  const categoryCall = (category) => {
    setSearchCategory(category);
    console.log("The searchCategory", searchCategory);
    dispatch(productByCategoryAction(searchCategory));
  };

  return (
    <React.Fragment>
      <MetaData title="Product" />
      <div className="container">
        <h2 className="page-title">Products</h2>
        <div className="row my-20">
          <div className="left">
            <div className="filter-section">
              <input
                type="text"
                name="searchbar"
                placeholder="Search product..."
                className="product-search"
                onChange={setProductSearchHandler}
              />
              <h5>Categories</h5>
              <ul>
                {categoriesArray.map((category) => (
                  <li key={category} onClick={() => categoryCall(category)}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <HeadShake>
            <div className="right">
              {loading ? (
                <Loader />
              ) : (
                currentProduct.map((product) => (
                  <ProductCard product={product} />
                ))
              )}
            </div>
          </HeadShake>
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
    </React.Fragment>
  );
};

export default Products;
