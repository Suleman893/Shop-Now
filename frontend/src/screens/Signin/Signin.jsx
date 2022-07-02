import React, { useState, useEffect } from "react";
import Loader from "../../component/layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import signin from "../../images/signin.jpg";
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
    <section>
      <div className="imgBx">
        <img src={signin} />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login</h2>
          <form>
            <div className="inputBx">
              <span>Email</span>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
    </section>
  );
};

export default Signin;
