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
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.search ? location.search : null;

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [sliderMax, setSliderMax] = useState(100000);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filter, setFilter] = useState("");
  const [priceOrder, setPriceOrder] = useState("descending");
  const [sorting, setSorting] = useState("");
  const { loading, error, products, totalPages, uiValues } = useSelector(
    (state) => state.products
  );

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const dispatch = useDispatch();
  // const [setTheCategory, setSetTheCategory] = useSearchParams();
  const { categoryProducts } = useSelector((state) => state.productByCategory);
  const { searchedProducts } = useSelector((state) => state.searchProduct);

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

  const updateUIValues = () => {
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(pageNumber, query));
    setNumberOfPages(totalPages);
    setCurrentProduct(
      searchedProducts.length > 0
        ? searchedProducts
        : categoryProducts.length > 0
        ? categoryProducts
        : products
    );
    updateUIValues();
    scroll.scrollTo(1);
  }, [
    dispatch,
    pageNumber,
    setPageNumber,
    error,
    alert,
    searchedProducts,
    categoryProducts,
    filter,
    params,
    sorting,
  ]);

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
  };

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setPriceRange([0, sliderMax]);
    navigate("/products");
  };

  return (
    <React.Fragment>
      <MetaData title="Product" />
      <Header/>
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
                min={1}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommitted={onSliderCommitHandler}
                disabled={loading}
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
      <Footer/>
    </React.Fragment>
  );
};

export default Products;
