import React, { useState } from "react";
import "./Signup.css";
import banner from "../../images/banner.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dont match");
    } else {
      const user = { name, email, password, confirmPassword };
      console.log("The user is", user);
      dispatch(registerUser(user));
    }
  };
  return (
    <div className="container">
      <div className="signup-box">
        <h2 className="page-title ">Signup</h2>

        <div className="signup-row">
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="mx-10"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Password"
            value={email}
            className="mx-10"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="mx-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="mx-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn mx-10" onClick={signupHandler}>
            Signup
          </button>

          <Link to="/signin">
            <span>Already have an account?Signin now</span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
