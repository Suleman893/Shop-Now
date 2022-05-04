import React from "react";
import "../Signin/Signin.css";
import {Link} from "react-router-dom";
const Signup = () => {
  return (
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
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Password" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <input type="text" placeholder="Role" />
                <button type="submit" className="btn">
                  Signup
                </button>
                <a href="">Forgot password</a>
                <Link to="/signin">Already have account </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
