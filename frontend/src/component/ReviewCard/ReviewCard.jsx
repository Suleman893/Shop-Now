import React from "react";
import ReactStars from "react-rating-stars-component";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <React.Fragment>
      <div className="review-card mx-10">
        <div className="review-card-content">
          <div className="user-review-info">
            <div className="user-review-info-img">
              <img src={review.userPic} alt="review" />
            </div>
            <div className="user-review-info-desc">
              <h5 className="mx-10">{review.name}</h5>
              <p className="mx-10">{review.name}</p>
              <p className="mx-10">{review.date}</p>
            </div>
          </div>
          <hr />
          <div className="reviews-by-wrapper">
            <h5>Review's by {review.name}: </h5>
            <ReactStars
              edit={false}
              color="rgba(20,20,20,0.1)"
              activeColor="#ffd700"
              isHalf={true}
              size={window.innerWidth < 600 ? 20 : 25}
              value={review.rating}
            />
          </div>
          <h5 className="mx-10"> Comment by {review.name} : </h5>
          <span>{review.comment} </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviewCard;
