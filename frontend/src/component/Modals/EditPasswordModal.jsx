import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { updateMyPassword, clearErrors } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import "./ModalStyling.css";

const EditPasswordModal = () => {
  const alert = useAlert();

  const { currentUser, loggedInUserInfo } = useSelector(
    (state) => state.loginUser
  );

  const { success, loading, error } = useSelector(
    (state) => state.editMyPassword
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
    if (
      updatedPassword.oldPassword.length < 5 ||
      updatedPassword.oldPassword.length > 15 ||
      updatedPassword.newPassword.length < 5 ||
      updatedPassword.newPassword.length > 15 ||
      updatedPassword.confirmNewPassword.length < 5 ||
      updatedPassword.confirmNewPassword.length > 15
    ) {
      alert.error("Password length must be 5-15");
    } else {
      dispatch(updateMyPassword(updatedPassword, currentUser));
      setOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated");
      dispatch(clearErrors());
    }
  }, [dispatch, error, success, alert]);

  return (
    <div>
      <button onClick={handleClickOpen} className="btn">
        Edit Password
      </button>
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
