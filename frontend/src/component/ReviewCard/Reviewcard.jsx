import React from "react";
import ReactStars from "react-rating-stars-component";

const Reviewcard = ({review}) => {

  const ratingOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,
  };

  return (
    <div className="col-4">
      <h4> {review} </h4>
      <ReactStars {...ratingOptions} />
      <p>{review}</p>
    </div>
  );
};

export default Reviewcard;
