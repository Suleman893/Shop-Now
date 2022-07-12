import React, { useState, useEffect } from "react";
import "./Signup.css";
import banner from "../../images/banner.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, clearErrors } from "../../redux/actions/userActions";
import signup from "../../images/signup.jpg";
import { Validate } from "../../validation/SignUpValidation";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";

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
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Registered successfully");
    }

    if (localStorage.getItem("currentUser")) {
      navigate("/myProfile");
    }
  }, [error, alert, success]);

  return (
    <>
      <MetaData title="Signup" />

      <section>
        <div className="imgBx">
          <img src={signup} />
        </div>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="contentBx">
            <div className="formBx">
              <h2>Signup</h2>
              <form>
                <div className="inputBx">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <p>{formErrors.name ? formErrors.name : " "}</p>
                <div className="inputBx">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p>{formErrors.email ? formErrors.email : " "}</p>
                <div className="inputBx">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <div className="inputBx">
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
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
                  <Link to="/signin">Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Signup;
