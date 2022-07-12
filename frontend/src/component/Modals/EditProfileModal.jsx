import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { updateMySelf } from "../../redux/actions/userActions";

export default function FormDialog() {
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
    dispatch(updateMySelf(updatedUser, currentUser));
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Open form dialog</button>
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
          <TextField
            autoFocus
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={updatedUser.password}
            onChange={editonChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={updatedUser.confirmPassword}
            onChange={editonChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
