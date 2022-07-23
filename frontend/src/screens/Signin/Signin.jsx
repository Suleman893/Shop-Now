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
          <div className="content-box">
            <div className="form-box">
              <h2>Signin</h2>
              <p>Welcome back, you’ve been missed!</p>
              <form>
                <div className="input-box">
                  <span className="required">*</span> <span>Email</span>
                  <span className="input-box-icon">
                    <EmailIcon style={{ color: "#ff7f50" }} />
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p>{formErrors.email ? formErrors.email : " "}</p>
                <div className="input-box">
                  <span className="required">*</span> <span> Password</span>
                  <span className="input-box-icon">
                    <KeyIcon style={{ color: "#ff7f50" }} />
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <div className="input-box">
                  <input
                    type="submit"
                    value="Signin"
                    name="Signin"
                    onClick={loginHandler}
                  ></input>
                </div>

                <div className="redirect">
                  <p>Dont have account?</p>
                  <Link to="/signup">
                    <p style={{ color: "#00a300" }}> Sign up</p>
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

export default Signin;
