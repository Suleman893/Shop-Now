import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, clearErrors } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import { Validate } from "../../validation/SignUpValidation";
import signup from "../../images/signup.jpg";
import MetaData from "../../component/Layout/MetaData";
import Loader from "../../component/Layout/Loader/Loader";
import "./Signup.css";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

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
    const user = { name, email, password, confirmPassword, previewSource };

    const errorsCount = Validate(user);

    setFormErrors(errorsCount);
    if (Object.keys(errorsCount).length === 0) {
      dispatch(registerUser(user));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      alert.info("Already LoggedIn");
      navigate("/myProfile");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Registered successfully");
      dispatch(clearErrors());
      navigate("/signin");
    }
  }, [error, alert, success]);

  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <React.Fragment>
      <MetaData title="Signup" />
      <section>
        {loading ? (
          <Loader />
        ) : (
          <div className="signup-bg">
            <div className="signup-box">
              <img
                src={
                  previewSource
                    ? previewSource
                    : "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"
                }
                alt="chosen"
                className="avatar"
              />
              <h1>Signup</h1>
              <form>
                <p>Name</p>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p>{formErrors.name ? formErrors.name : " "}</p>

                <p>Email</p>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p>{formErrors.email ? formErrors.email : " "}</p>

                <p>Password</p>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>{formErrors.password ? formErrors.password : " "}</p>

                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="Your Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p>{formErrors.password ? formErrors.password : " "}</p>

                <input
                  type="file"
                  name="image"
                  value={fileInput}
                  onChange={handleFileInputChange}
                />

                <input
                  type="submit"
                  value="Signin"
                  name="Signin"
                  onClick={signupHandler}
                ></input>

                <div className="redirect">
                  <span>Already have account ? </span>
                  <Link to="/signin">Sign in</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default Signup;
