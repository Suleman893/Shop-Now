import React, { useState } from "react";
import "./Signup.css";
import banner from "../../images/banner.png";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import signup from "../../images/signup.jpg";

const Signup = () => {
  const navigate = useNavigate();

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
      navigate("/signin");
    }
  };
  return (
    <section>
      <div className="imgBx">
        <img src={signup} />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login</h2>
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
            <div className="inputBx">
              <span>Email</span>
              <input
                type="email"
                placeholder="Password"
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
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

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
    </section>
  );
};

export default Signup;
