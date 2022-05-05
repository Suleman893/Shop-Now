import React, {useState, useEffect} from "react";
import "./Signin.css";
import Loader from "../../component/layout/Loader/Loader";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/actions/userActions";
import account from "../../images/account.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    const user = {email, password};
    dispatch(loginUser(user));
  };
  return (
    <>
      <div className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img src={account} alt="accountimg" />
            </div>
            <div className="col-2">
              <div className="form-container">
                <div className="form-btn">
                  <span>Login</span>
                  <hr id="indicator" />
                </div>
                <form>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="btn" onClick={loginHandler}>
                    Login
                  </button>
                  <Link to="/signup">
                    {" "}
                    <span>New? Register now</span>{" "}
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
