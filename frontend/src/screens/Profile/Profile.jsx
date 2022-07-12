import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import FormDialog from "../../component/Modals/EditProfileModal";
import { clearErrors } from "../../redux/actions/userActions";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../../component/Layout/MetaData";

const MyProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { loggedInUserInfo, error, loading, currentUser } = useSelector(
    (state) => state.loginUser
  );
  const handleEditProfileModal = () => {
    setOpen(!open);
  };
  const myOrderHandler = () => {
    navigate("/myOrders");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, navigate]);

  return (
    <>
    <MetaData title="My Profile" />
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="page-title"> {loggedInUserInfo.name} Profile </h1>
          <div className="row">
            <div className="profile-left">
              <div>
                <ul className="profile-panel-sidebar">
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
                    <b>Created At:</b> <span>{loggedInUserInfo.createdAt}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-right">
              <div>
                <button onClick={handleEditProfileModal}>
                  <FormDialog setOpen={setOpen} open={open} />
                </button>
                <button onClick={myOrderHandler}>My Orders</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MyProfile;
