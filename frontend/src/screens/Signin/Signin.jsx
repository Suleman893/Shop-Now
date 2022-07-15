import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors } from "../../redux/actions/userActions";
import Loader from "../../component/Layout/Loader/Loader";
import signin from "../../images/signin.jpg";
import { Validate } from "../../validation/SignInValidation";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";
import "./Signin.css";

const Signin = () => {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, success } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const loginHandler = (e) => {
    e.preventDefault();
    const userInfo = { email, password };
    const errorsCount = Validate(userInfo);
    setFormErrors(errorsCount);
    if (Object.keys(errorsCount).length === 0) {
      dispatch(loginUser(userInfo));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      alert.info("Already LoggedIn");
    }
    if (error) {
      console.log("The error", error);
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Login successful");
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <React.Fragment>
      <MetaData title="Signin" />
      <section>
        {/*  <div className="imgBx">
          <img src={signin} />
        </div> */}
        {loading ? (
          <Loader />
        ) : (
          <div className="contentBx">
            <div className="formBx">
              <h2>Signin</h2>
              <p>Welcome back, you’ve been missed!</p>
              <form>
                <div className="inputBx">
                  <span> * Email</span>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p>{formErrors.email ? formErrors.email : " "}</p>
                <div className="inputBx">
                  <span>* Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <div className="inputBx">
                  <input
                    type="submit"
                    value="Signin"
                    name="Signin"
                    onClick={loginHandler}
                  ></input>
                </div>

                <div className="inputBx">
                  <p>Dont have account?</p>
                  <Link to="/signup">Sign up</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default Signin;
