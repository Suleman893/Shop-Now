import React, { useEffect, useState } from "react";
import buy1 from "../../images/product.jpg";
import user from "../../images/user.png";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails , addReviews} from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartActions";
import ImageGallery from "react-image-gallery";
import "./ProductDetail.css";
import { animateScroll as scroll } from "react-scroll"
import HeadShake from 'react-reveal/HeadShake';
import { Rating } from "@material-ui/lab";
const ProductDetail = () => {

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  console.log('The rating',rating)
  const toSend={rating,comment,productID:product._id}
  const submitReview = (e)=>
  {
    e.preventDefault();
    dispatch(addReviews(toSend));
  }

  useEffect(() => {
    dispatch(getProductDetails(param.id));
    scroll.scrollTo(1)
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${param.id}?qty=${qty}`);
    dispatch(addToCart(product._id, qty));
  };

  console.log("The ,product.ratings",product.ratings , product.productName)
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
              <div>
              <ReactStars 
                      edit={false}
                      color="rgba(20,20,20,0.1)"
                      activeColor="#ffd700"
                      size={window.innerWidth < 600 ? 20 : 25}
                      value={product.ratings }
                      isHalf={true}
                  />
                  {product.numOfReviews}
              </div>
             
              <hr />
              <p className="mx-10 product-card-price">Rs: {product.price}</p>
              <div className="product-add-to-cart">
                <button>+</button>
                <p className="mx-10">Value</p>
                <button>-</button>
              </div>
              <button className="add-to-cart mx-10">Add to cart</button>
              <hr />
              <h3 className={"mx-10" && product.stock > 0 ? "green" : "red"}>
                {product.stock > 0 ? `In stock ` : "Not available"}
              </h3>
              <p className="mx-10">
                <b>Description:</b> {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail-container">
        <h4 className="page-title-small">What others say's about {product.productName} </h4>
        {product.reviews && product.reviews.map((curr)=>  ( 
          <HeadShake>

        <div className="review-card mx-10">    
          <div className="review-card-info">     
           <img src={user} alt="user" />      
           <h5 className="mx-10">{curr.name}</h5>    
          </div>    
          <div>
          <ReactStars 
          edit={false}
          color="rgba(20,20,20,0.1)"
          activeColor="#ffd700"
          size={window.innerWidth < 600 ? 20 : 25}
          value={curr.rating}
          isHalf={true}
      />
          </div>
           <p className="mx-10">{curr.comment}</p>  
        </div>
        </HeadShake>

        ))}

        <div className="leave-comment mx-20">
        <Rating
        onChange={(e) => setRating(e.target.value)}
        value={rating}
        size="large"
      />
        <textarea
        cols="30"
        rows="5"
        placeholder="Leave a comment..." 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={submitReview}></button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
