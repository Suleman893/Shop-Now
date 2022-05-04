import React, {useEffect} from "react";
import "./Products.css";
import buy1 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import {getProduct} from "../../redux/actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
const Products = () => {
  const dispatch = useDispatch();

  const {loading, error, products} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    // <div className="small-container">
    <>
      <div className="row row-2">
        <h2 className="title">All Products</h2>
        <select>
          <options>Default Sorting</options>
          <options>Default Sorting</options>
          <options>Default Sorting</options>
          <options>Default Sorting</options>
          <options>Default Sorting</options>
        </select>
        <input type="text" placeholder="Search" />
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-4">
            <Link to={`/productdetail/${product._id}`}>
              <img src={buy1} alt="product" />
              <h4> {product.name} </h4>
              <ReactStars {...ratingOptions} />
              <p> ${product.price}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="page-btn">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>&#8594;</span>
      </div>
    </>
    // </div>
  );
};

export default Products;
