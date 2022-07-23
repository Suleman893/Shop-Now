import React from "react";
import user from "../../images/user.png";
import ReactStars from "react-rating-stars-component";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <React.Fragment>
      <div className="review-card mx-10">
        <div className="review-card-content">
          <div className="review-card-info">
            <img src={user} alt="user" />
            <div>
              <h5 className="mx-10">{review.name}</h5>
              <p className="mx-10">{review.name}</p>
              <p className="mx-10">{review.date}</p>
            </div>
          </div>
          <div>
            <ReactStars
              edit={false}
              color="rgba(20,20,20,0.1)"
              activeColor="#ffd700"
              size={window.innerWidth < 600 ? 20 : 25}
              value={review.rating}
              isHalf={true}
            />
          </div>
          <p className="mx-10">{review.comment}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviewCard;
