import React, {useState} from "react";
import "../Signin/Signin.css";
import banner from "../../images/banner.png";
import {Link} from "react-router-dom";
import { useDispatch} from "react-redux";
import {registerUser} from "../../redux/actions/userActions";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    } else {
      const user = {name, email, password, confirmPassword};
      console.log("The user is", user);
      dispatch(registerUser(user));
    }
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <img src={banner} alt="accountimg" />
          </div>

          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <span>Register</span>
                <hr id="indicator" />
              </div>

              <form>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Password"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="btn" onClick={signupHandler}>
                  Signup
                </button>

                <Link to="/signin">
                  <span>New? Register now</span>{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
