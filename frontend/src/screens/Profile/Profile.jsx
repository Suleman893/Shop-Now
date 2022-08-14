import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import EditProfileModal from "../../component/Modals/EditProfileModal";
import { clearErrors, userDelete } from "../../redux/actions/userActions";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../../component/Layout/MetaData";
import EditPasswordModal from "../../component/Modals/EditPasswordModal";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const MyProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { loggedInUserInfo, currentUser, error, loading } = useSelector(
    (state) => state.loginUser
  );
  const { delLoading, delSuccess, delError } = useSelector(
    (state) => state.deleteUser
  );
  const myOrderHandler = () => {
    navigate("/myOrders");
  };

  const deleteMySelf = () => {
    dispatch(userDelete(currentUser));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (delSuccess) {
      alert.success("Profile deleted");
      navigate("/");
      dispatch(clearErrors());
    }
    if (delError) {
      alert.error(delError);
      dispatch(clearErrors());
    }
  }, [error, alert, delSuccess, delError]);

  return (
    <React.Fragment>
      <MetaData title={`${loggedInUserInfo.name} Profile `} />
      <Header />
      <div className="container">
        {loading || delLoading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="page-title"> My Profile</h1>
            <div className="row profile-wrapper my-20">
              <div className="profile-left">
                <div className="profile-left-img">
                  <img src={loggedInUserInfo.userPic} alt="profile-pic" />
                </div>
              </div>
              <div className="profile-middle">
                <ul className="profile-info">
                  <li>
                    <b>Name:</b>{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {loggedInUserInfo.name}
                    </span>
                  </li>
                  <li>
                    <b>Email:</b> <span>{loggedInUserInfo.email}</span>
                  </li>
                  <li>
                    <b>Role:</b>{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {loggedInUserInfo.role}
                    </span>
                  </li>
                  <li>
                    <b>Created At:</b>{" "}
                    <span>
                      {new Date(loggedInUserInfo.createdAt).toLocaleDateString(
                        "en-US"
                      )}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="profile-right">
                <div className="profile-btns-container">
                  <EditProfileModal setOpen={setOpen} open={open} />
                  <EditPasswordModal setOpen={setOpen} open={open} />
                  <button className="btn" onClick={deleteMySelf}>
                    Delete Profile
                  </button>
                  <button className="btn" onClick={myOrderHandler}>
                    My Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default MyProfile;
