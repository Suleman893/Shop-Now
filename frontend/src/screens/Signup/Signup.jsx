import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, clearErrors } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import { Validate } from "../../validation/SignUpValidation";
import signup from "../../images/signup.jpg";
import MetaData from "../../component/Layout/MetaData";
import Loader from "../../component/Layout/Loader/Loader";
import "./Signup.css";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

const Signup = () => {
  const alert = useAlert();

  const { loading, error, success } = useSelector(
    (state) => state.registerUser
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const signupHandler = (e) => {
    e.preventDefault();
    const user = { name, email, password, confirmPassword };

    const errorsCount = Validate(user);

    setFormErrors(errorsCount);
    if (Object.keys(errorsCount).length === 0) {
      dispatch(registerUser(user));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      alert.info("Already LoggedIn");
      navigate("/myProfile");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Registered successfully");
      dispatch(clearErrors());
      navigate("/signin");
    }
  }, [error, alert, success]);

  return (
    <React.Fragment>
      <MetaData title="Signup" />
      <section>
        {/* <div className="imgBx">
          <img src={signup} />
        </div> */}
        {loading ? (
          <Loader />
        ) : (
          <div className="contentBx">
            <div className="formBx">
              <h2>Signup</h2>
              <form>
                <div className="inputBx">
                  <span className="required">*</span> <span>Name</span>
                  <SentimentSatisfiedAltIcon />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <p>{formErrors.name ? formErrors.name : " "}</p>
                <div className="inputBx">
                  <span className="required">*</span> <span> Email</span>
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p>{formErrors.email ? formErrors.email : " "}</p>
                <div className="inputBx">
                  <span className="required">*</span> <span>Password</span>
                  <KeyIcon />
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <div className="inputBx">
                  <span className="required">*</span>{" "}
                  <span> Confirm Password</span>
                  <KeyIcon />
                  <input
                    type="password"
                    placeholder="Your Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <div className="inputBx">
                  <input
                    type="submit"
                    value="Signin"
                    name="Signin"
                    onClick={signupHandler}
                  ></input>
                </div>

                <div className="inputBx">
                  <p>Already have account?</p>
                  <Link to="/signin">
                    <p> Sign In </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default Signup;
