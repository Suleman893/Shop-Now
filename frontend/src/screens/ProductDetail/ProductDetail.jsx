import React, {useEffect} from "react";
import "./ProductDetail.css";
import buy1 from "../../images/product.jpg";
import ReactStars from "react-rating-stars-component";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails} from "../../redux/actions/productAction";
import Reviewcard from "../../component/ReviewCard/Reviewcard";
import Loader from "../../component/layout/Loader/Loader";
const ProductDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  // const {product, loading, error} = useSelector(
  //   (state) => state.productDetail
  // );

  const {product, loading, error} = useSelector((state) => state.productDetail);

  console.log("The product we got", product);
  useEffect(() => {
    dispatch(getProductDetails(param.id));
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
                <h2>{product.name}</h2>
                <hr />
                <ReactStars {...ratingOptions} />
                <hr />

                <h4> {product.price} </h4>
                <button>-</button>
                <input type="number " value="1" />
                <button>+</button>
                <Link to="/cart" className="btn">
                  Add to Cart
                </Link>
                <hr />

                <h3 className={product.stock > 1 ? "green" : "red"}>
                  {" "}
                  {product.stock > 1
                    ? `In stock : ${product.stock}`
                    : "Not available"}
                </h3>
                <hr />

                <h3>Product Description</h3>
                <br />
                <p>{product.description}</p>
              </div>
            </div>
          </div>

          <div className="small-container">
            <div className="row row-2">
              <h2>Reviews</h2>
            </div>
            <p>What others says other this product</p>
          </div>

          <div className="small-container">
            <div className="row">
              {product.reviews && product.reviews[0]
                ? product.map((review) => <Reviewcard review={review} />)
                : "No review yet"}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
