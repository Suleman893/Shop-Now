import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { updateMySelf, clearErrors } from "../../redux/actions/userActions";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./ModalStyling.css";
import { Validate } from "../../validation/EditUserValidation";

const EditProfileModal = () => {
  const alert = useAlert();

  const { currentUser, loggedInUserInfo } = useSelector(
    (state) => state.loginUser
  );

  const { success, loading, error } = useSelector((state) => state.editMySelf);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = loggedInUserInfo;
  const [updatedUser, setUpdatedUser] = useState(initialValue);

  const editonChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errorsCount = Validate(updatedUser);
    if (errorsCount.name) {
      alert.error(errorsCount.name);
    }
    if (errorsCount.email) {
      alert.error(errorsCount.email);
    }
    if (Object.keys(errorsCount).length === 0) {
      dispatch(updateMySelf(updatedUser, currentUser));
      setOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Profile updated");
      dispatch(clearErrors());
    }
  }, [dispatch, error, success, alert]);

  return (
    <React.Fragment>
      <button onClick={handleClickOpen} className="btn">
        Edit Profile{" "}
      </button>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="name"
                fullWidth
                variant="standard"
                value={updatedUser.name}
                onChange={editonChangeHandler}
              />
              <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={updatedUser.email}
                onChange={editonChangeHandler}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={submitHandler}>Update Profile</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EditProfileModal;
