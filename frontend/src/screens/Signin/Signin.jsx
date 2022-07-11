import React, { useState, useEffect } from "react";
import Loader from "../../component/layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,clearErrors } from "../../redux/actions/userActions";
import signin from "../../images/signin.jpg";
import "./Signin.css";
import { Validate } from "../../validation/SignInValidation";
import { useAlert } from "react-alert";

const Signin = () => {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const {loading,error,success} = useSelector((state)=>state.loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({})
  const loginHandler = (e) => {
    e.preventDefault();
    const user = { email, password };
    const errorsCount = Validate(user);
    setFormErrors(errorsCount)
    if (Object.keys(errorsCount).length === 0) {
    dispatch(loginUser(user));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(success)
    {
      alert.success("Login successfully");
    }
    if (localStorage.getItem("currentUser")) {
      navigate("/myProfile");
    }
  }, [error, alert, success]);
 
  return (
    <section>
      <div className="imgBx">
        <img src={signin} />
      </div>
      {
        loading ? 
        (<h1>loading</h1>)
        :
(
  <>
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
  </>
)
      }
      
    </section>
  );
};

export default Signin;
