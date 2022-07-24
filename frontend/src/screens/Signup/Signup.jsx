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
        {/* <div className="imgBx">
          <img src={signup} />
        </div> */}
        {loading ? (
          <Loader />
        ) : (
          <div className="content-box">
            <div className="form-box">
              <h2>Signup</h2>
              <form>
                <div className="input-box">
                  <span className="required">*</span> <span>Name</span>
                  <span className="input-box-icon">
                    <SentimentSatisfiedAltIcon style={{ color: "#ff7f50" }} />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <p>{formErrors.name ? formErrors.name : " "}</p>
                <div className="input-box">
                  <span className="required">*</span> <span> Email</span>
                  <span className="input-box-icon">
                    <EmailIcon style={{ color: "#ff7f50" }} />
                  </span>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p>{formErrors.email ? formErrors.email : " "}</p>
                <div className="input-box">
                  <span className="required">*</span> <span>Password</span>
                  <span className="input-box-icon">
                    <KeyIcon style={{ color: "#ff7f50" }} />
                  </span>
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>
                <div className="input-box">
                  <span className="required">*</span>{" "}
                  <span> Confirm Password</span>
                  <span className="input-box-icon">
                    <KeyIcon style={{ color: "#ff7f50" }} />
                  </span>
                  <input
                    type="password"
                    placeholder="Your Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <p>{formErrors.password ? formErrors.password : " "}</p>

                <div className="input-box">
                  <span className="required">*</span> <span>Upload Image</span>
                  <span className="input-box-icon">
                    {previewSource && (
                      <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: "30px" }}
                      />
                    )}
                  </span>
                  <input
                    type="file"
                    name="image"
                    value={fileInput}
                    onChange={handleFileInputChange}
                  />
                </div>

                <div className="input-box">
                  <input
                    type="submit"
                    value="Signin"
                    name="Signin"
                    onClick={signupHandler}
                  ></input>
                </div>

                <div className="redirect">
                  <p>Already have account?</p>
                  <Link to="/signin">
                    <p style={{ color: "#00a300" }}> Sign in </p>
                  </Link>
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
