import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import EditProfileModal from "../../component/Modals/EditProfileModal";
import { clearErrors } from "../../redux/actions/userActions";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../../component/Layout/MetaData";
import EditPasswordModal from "../../component/Modals/EditPasswordModal";
import user from "../../images/user.png";

const MyProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { loggedInUserInfo, error, loading } = useSelector(
    (state) => state.loginUser
  );

  const myOrderHandler = () => {
    navigate("/myOrders");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert]);

  return (
    <React.Fragment>
      <MetaData title={`${loggedInUserInfo.name} Profile `} />
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="page-title"> My Profile</h1>
            <div className="row profile-wrapper my-20">
              <div className="profile-left">
                <div className="profile-left-image">
                  <img src={user} alt="profile-pic" />
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
                        {new Date(
                          loggedInUserInfo.createdAt
                        ).toLocaleDateString("en-US")}
                      </span>
                    </li>
                  </ul>
              </div>
              <div className="profile-right">
                <div className="profile-btns-container">
                  <EditProfileModal setOpen={setOpen} open={open} />
                  <EditPasswordModal setOpen={setOpen} open={open} />
                  <button className="btn" onClick={myOrderHandler}>
                    My Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
