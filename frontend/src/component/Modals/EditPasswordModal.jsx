import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMyPassword,
  updateMySelf,
} from "../../redux/actions/userActions";

const EditPasswordModal = () => {
  const { currentUser, loggedInUserInfo } = useSelector(
    (state) => state.loginUser
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [updatedPassword, setUpdatedPassword] = useState(initialValue);

  const editonChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedPassword({
      ...updatedPassword,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateMyPassword(updatedPassword, currentUser));
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Edit Password</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Passowrd</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="oldPassword"
            label="Enter Old Password"
            type="text"
            fullWidth
            variant="standard"
            value={updatedPassword.oldPassword}
            onChange={editonChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="newPassword"
            label="Enter New Password"
            type="text"
            fullWidth
            variant="standard"
            value={updatedPassword.newPassword}
            onChange={editonChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="text"
            fullWidth
            variant="standard"
            value={updatedPassword.confirmNewPassword}
            onChange={editonChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Update Password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPasswordModal;
