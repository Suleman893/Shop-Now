import React from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";

const MyProfile = () => {

  const {  loggedInUserInfo } = useSelector((state) => state.loginUser);
  console.log('The all states',useSelector((state)=>state));
  return (
     <>
      <div className="container">
      <h1 className="page-title"> {loggedInUserInfo.name} Profile </h1>
      <p>{loggedInUserInfo.email}</p>
      <p>{loggedInUserInfo.role}</p>

      <div className="row">
        <div className="profile-left">
          <div>
            <ul className="profile-panel-sidebar">
              <li>
                <button>Edit Profile</button>
              </li>
              <li>
                <button>My Orders</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-right">component</div>
      </div>
    </div>
    </>
    )
};

export default MyProfile;
