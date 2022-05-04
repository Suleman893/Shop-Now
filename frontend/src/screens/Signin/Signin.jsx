import React, {useState, useEffect} from "react";
import "./Signin.css";
import Loader from "../../component/layout/Loader/Loader";

import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, login} from "../../redux/actions/userActions";
const Signin = () => {
  // useEffect(()=>
  // {
  //   if (isAuthenticated) {
  //   navigate("/account");
  // }
  // })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {error, loading, isAuthenticated} = useSelector((state) => state.user);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="account-page">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src="" alt="accountimg" />
                </div>

                <div className="col-2">
                  <div className="form-container">
                    <div className="form-btn">
                      <span>Login</span>
                      <hr id="indicator" />
                    </div>

                    <form>
                      <input type="text" placeholder="Username" />
                      <input type="password" placeholder="Password" />

                      <button
                        type="submit"
                        className="btn"
                        onClick={submitHandler}
                      >
                        Login
                      </button>
                      <a href="">Forgot password</a>
                      <Link to="/signup">Register now </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signin;
