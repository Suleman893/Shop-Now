import React , {useEffect} from "react";
import "./Profile.css";
import { useSelector,useDispatch} from "react-redux";
import FormDialog from "../../component/Modals/EditProfileModal";
import {clearErrors } from "../../redux/actions/userActions";
import Loader from "../../component/layout/Loader/Loader";
import { useAlert } from "react-alert";

const MyProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const {  loggedInUserInfo,error ,loading} = useSelector((state) => state.loginUser);
  const handleEditProfileModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
  }, [error, alert]);

  return (
      <div className="container">
      {
        loading? <Loader/>
        :
(
  <>
  <h1 className="page-title"> {loggedInUserInfo.name} Profile </h1>
  <div className="row">
        <div className="profile-left">
          <div>
            <ul className="profile-panel-sidebar">
              <li>
                <b>Name:</b> <span style={{textTransform:"capitalize"}}>{loggedInUserInfo.name}</span>
              </li>
              <li>
              <b>Email:</b>  <span>{loggedInUserInfo.email}</span>
              </li>
              <li>
              <b>Role:</b> <span style={{textTransform:"capitalize"}}>{loggedInUserInfo.role}</span>
              </li>
              <li>
              <b>Created At:</b> <span>{loggedInUserInfo.createdAt}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-right">
        <div>
        <button onClick={handleEditProfileModal}><FormDialog setOpen={setOpen} open={open} /></button>
        <button>My Orders</button>
        </div>
        </div>
      </div>
      </>
)
      }
     
    </div>
    )
};

export default MyProfile;
