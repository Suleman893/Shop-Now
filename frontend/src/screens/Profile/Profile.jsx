import React from "react";
import "./Profile.css";
const MyProfile = () => {
  return (
    <div className="container">
      <h1 className="page-title">My Profile</h1>
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
  );
};

export default MyProfile;
