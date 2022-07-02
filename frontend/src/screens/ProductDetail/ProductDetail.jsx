import React, { useEffect, useState } from "react";
import buy1 from "../../images/product.jpg";
import user from "../../images/user.png";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";
import Reviewcard from "../../component/ReviewCard/Reviewcard";
import Loader from "../../component/layout/Loader/Loader";
import { addToCart } from "../../redux/actions/cartActions";
import ImageGallery from "react-image-gallery";
import "./ProductDetail.css";
const ProductDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

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

  const images = [
    {
      original: buy1,
      thumbnail: buy1,
    },
    {
      original: buy1,
      thumbnail: buy1,
    },
    {
      original: buy1,
      thumbnail: buy1,
    },
  ];

  return (
    <div>
      <div className="product-detail-container">
        <h2 className="page-title ">{product.productName}</h2>
        <div className="product-detail-row">
          <div className="product-detail-left">
            {/*<div className="product-detail-img">
              <img src={buy1} alt="product-detail-img" />
  </div> */}
            <ImageGallery items={images} />
          </div>
          <div className="product-detail-right">
            <div className="product-detail-content">
              <h1 className="mx-10" style={{ textTransform: "capitalize" }}>
                {product.name}
              </h1>
              <hr />
              <p className="mx-10">Rating stars</p>
              <hr />
              <p className="mx-10 product-card-price">Rs: {product.price}</p>
              <div className="product-add-to-cart">
                <button>+</button>
                <p className="mx-10">Value</p>
                <button>-</button>
              </div>
              <button className="add-to-cart mx-10">Add to cart</button>
              <hr />
              <h3 className={product.stock > 0 ? "green" : "red" && "mx-10"}>
                {" "}
                {product.stock > 0 ? `In stock ` : "Not available"}
              </h3>
              <p className="mx-10">
                <b>Description:</b> Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ut distinctio vitae reprehenderit officiis
                ullam. Ea culpa sed blanditiis rem odio praesentium quae sequi
                dignissimos ullam alias, enim distinctio dolor. Laudantium?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail-container">
        <h2 className="page-title">What Others Say About:</h2>
        <div className="review-card mx-10">
          <div className="review-card-info">
            <img src={user} alt="user" />
            <h5 className="mx-10">John Kelly</h5>
          </div>
          <p className="mx-10">Lorem ipsum dolor sit amet consectetur.</p>
        </div> 
        <div className="review-card mx-10">
          <div className="review-card-info">
            <img src={user} alt="user" />
            <h5 className="mx-10">Ahmad Ali</h5>
          </div>
          <p className="mx-10">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="review-card mx-10">
          <div className="review-card-info">
            <img src={user} alt="user" />
            <h5 className="mx-10">Hp buyer</h5>
          </div>
          <p className="mx-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse animi
            totam ipsa voluptas maxime neque facilis labore voluptatibus. Quo,
            blanditiis.
          </p>
        </div>
        <div className="leave-comment mx-20">
          <input placeholder="Leave a comment..." />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
