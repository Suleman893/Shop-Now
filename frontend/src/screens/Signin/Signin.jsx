import React, { useState, useEffect } from "react";
import Loader from "../../component/layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import account from "../../images/account.png";
import "./Signin.css";

const Signin = () => {
  console.log("I am in sigin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/products");
    }
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginUser(user));
  };
  return (
    <div>
      <div className="container">
        <div className="signin-box">
          <h2 className="page-title ">Sign in</h2>
          <div className="signin-row">
            <input
              className="mx-10"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="mx-10"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn mx-10" onClick={loginHandler}>
              Login
            </button>
            <Link to="/signup">
              {" "}
              <span>New? Register now</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
