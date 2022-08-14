import React, { useEffect, useState } from "react";
import { subscribe } from "../../redux/actions/subscribeActions";
import { useDispatch, useSelector } from "react-redux";
import "./NewsLetter.css";
import { useAlert } from "react-alert";

const NewsLetter = () => {
  const { loading, success } = useSelector((state) => state.subscribe);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [subscribeEmail, setSubscribeEmail] = useState("");

  useEffect(() => {
    if (success) {
      alert.success("Subscribed");
    }
  }, [success]);

  const subscribeHandler = () => {
    dispatch(subscribe(subscribeEmail));
  };

  return (
    <React.Fragment>
      <div className="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h4> Sign Up for Newsletter</h4>
            <p>
              Get Email updates about our latest shop and
              <span> special offers </span>
            </p>
          </div>
          <div className="newsletter-form">
            <input
              type="text"
              value={subscribeEmail}
              placeholder="Your email address"
              onChange={(e) => setSubscribeEmail(e.target.value)}
            />
            <button className="btn" onClick={subscribeHandler}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewsLetter;
