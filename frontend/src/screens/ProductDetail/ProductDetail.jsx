import React, {useEffect, useState} from "react";
import "./ProductDetail.css";
import buy1 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails} from "../../redux/actions/productAction";
import Reviewcard from "../../component/ReviewCard/Reviewcard";
import Loader from "../../component/layout/Loader/Loader";
import {addToCart} from "../../redux/actions/cartActions";

const ProductDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {product, loading, error} = useSelector(
  //   (state) => state.productDetail
  // );
  const [qty, setQty] = useState(1);
  const {product, loading, error} = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(getProductDetails(param.id));
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${param.id}?qty=${qty}`);
    dispatch(addToCart(product._id, qty));
  };
  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error while fetching</h1>
      ) : (
        <>
          <div className="small-container single-product">
            <div className="row">
              <div className="col-2">
                <img src={buy1} alt="productdetail" width="100%" />
              </div>
              <div className="col-2">
                <p>Home / Mens Fashion</p>
                <h1>{product.name}</h1>
                <h4> $ {product.price} </h4>
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

                <ReactStars {...ratingOptions} />

                <h3 className={product.stock > 0 ? "green" : "red"}>
                  {" "}
                  {product.stock > 0
                    ? `In stock : ${product.stock}`
                    : "Not available"}
                </h3>
                <h3>Product Description</h3>
                <br />
                <p>{product.description}</p>

                <button className="btn" onClick={addToCartHandler}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="small-container">
            <div className="row row-2">
              <h2>What others says other this product</h2>
            </div>
          </div>

          <div className="small-container">
            <div className="row">
              {product.reviews && product.reviews[0]
                ? product.map((review) => <Reviewcard review={review} />)
                : "No review "}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
