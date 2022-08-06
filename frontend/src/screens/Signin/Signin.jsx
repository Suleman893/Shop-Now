import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors } from "../../redux/actions/userActions";
import Loader from "../../component/Layout/Loader/Loader";
import { Validate } from "../../validation/SignInValidation";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";
import "./Signin.css";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
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
          <div className="signin-bg">
            <div className="signin-box">
              <h1>Signup</h1>
              <form>
                <p>Name</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <p>{formErrors.email ? formErrors.email : " "}</p>
                <p>Password</p>

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <input
                  type="submit"
                  value="Signin"
                  name="Signin"
                  onClick={loginHandler}
                ></input>

                <div className="redirect">
                  <span>Dont have account?</span>
                  <Link to="/signup"> Sign up</Link>
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
