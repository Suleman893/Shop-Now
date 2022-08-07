import React, { useEffect, useState } from "react";
import "./Products.css";
import {
  clearErrors,
  getProduct,
  searchProduct,
  productByCategoryAction,
} from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import HeadShake from "react-reveal/HeadShake";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";
import ProductCard from "../../component/ProductCard/ProductCard";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Slider,
  TextField,
  Radio,
  Button,
} from "@mui/material";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const Products = () => {
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

  //ForPaginationState
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.search ? location.search : null;
  const [currentProduct, setCurrentProduct] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [sliderMax, setSliderMax] = useState(100000);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [priceOrder, setPriceOrder] = useState("descending");
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("");

  const { loading, error, products, uiValues } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const { categoryProducts } = useSelector((state) => state.productByCategory);
  const { searchedProducts } = useSelector((state) => state.searchProduct);

  const updateUIValues = (uiValues) => {
    setSliderMax(uiValues?.maxPrice);

    if (uiValues?.filtering.price) {
      let priceFilter = uiValues?.filtering.price;
      setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)]);
    }

    if (uiValues?.sorting.price) {
      let priceSort = uiValues?.sorting.price;
      setPriceOrder(priceSort);
    }
  };

  const handlePagination = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumber = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handlePagination}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    let query;
    if (params && !filter) {
      query = params;
    } else {
      query = filter;
    }

    if (sorting) {
      if (query.length === 0) {
        query = `?sorting=${sorting}`;
      } else {
        query = query + "&sort=" + sorting;
      }
    }
    dispatch(getProduct(query));
    setCurrentProduct(
      searchedProducts.length > 0
        ? searchedProducts
        : categoryProducts.length > 0
        ? categoryProducts
        : currentItems
    );
    updateUIValues(uiValues);
    scroll.scrollTo(1);
  }, [
    dispatch,
    error,
    alert,
    searchedProducts,
    categoryProducts,
    filter,
    params,
    sorting,
    currentPage,
  ]);

  const setProductSearchHandler = (e) => {
    let productSearchName = e.target.value;
    dispatch(searchProduct(productSearchName));
  };

  const categoryCall = (category) => {
    setSearchCategory(category);
    dispatch(productByCategoryAction(searchCategory));
  };

  const handlePriceInputChange = (e, type) => {
    let newRange;
    if (type === "lower") {
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);
      setPriceRange(newRange);
    }
    if (type === "upper") {
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);
      setPriceRange(newRange);
    }
  };

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const onTextfieldCommitHandler = () => {
    buildRangeFilter(priceRange);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;
    setFilter(urlFilter);
    navigate(urlFilter);
  };

  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("price");
    } else if (e.target.value === "descending") {
      setSorting("-price");
    }
    console.log("The sorting", sorting);
  };

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setPriceRange([0, sliderMax]);
    navigate("/products");
  };

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
  }
  return (
    <React.Fragment>
      <MetaData title="Product" />
      <Header />
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
              <Slider
                style={{ maxWidth: "80%" }}
                size="small"
                min={0}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                disabled={loading}
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommitted={onSliderCommitHandler}
              />
              <div className="price-filters">
                <TextField
                  // label="Min Price"
                  // size="small"
                  // id="lower"
                  // variant="outline"
                  type="number"
                  disabled={loading}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceInputChange(e, "lower")}
                  onBlur={onTextfieldCommitHandler}
                />
                <TextField
                  // label="Max Price"
                  // size="small"
                  // id="lower"
                  // variant="outline"
                  type="number"
                  disabled={loading}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceInputChange(e, "upper")}
                  onBlur={onTextfieldCommitHandler}
                />
              </div>
              <div>
                <FormControl component="fieldset" className="sort-filters">
                  <RadioGroup
                    aria-label="price-order"
                    name="price-order"
                    value={priceOrder}
                    onChange={handleSortChange}
                  >
                    <FormControlLabel
                      value="descending"
                      disabled={loading}
                      control={<Radio />}
                      label="Price: Highest - Lowest"
                    />
                    <FormControlLabel
                      value="ascending"
                      disabled={loading}
                      control={<Radio />}
                      label="Price: Lowest - Highest"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <Button size="small" color="primary" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </div>
          <HeadShake>
            <div className="right">
              {loading ? (
                <Loader />
              ) : currentProduct.length > 0 ? (
                currentProduct.map((product) => (
                  <ProductCard product={product} />
                ))
              ) : (
                <div className="no-product-found">
                  <h1>No Product Found</h1>
                </div>
              )}
            </div>
          </HeadShake>
        </div>
        <div className="page-btn">
          <ul className="page-numbers">
            <li>
              <button
                disabled={currentPage == pages[0] ? true : false}
                onClick={handlePrevBtn}
              >
                Prev
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumber}
            {pageIncrementBtn}
            <li>
              <button
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                onClick={handleNextBtn}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Products;
