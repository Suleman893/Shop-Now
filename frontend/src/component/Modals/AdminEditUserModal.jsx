import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { adminEditUser, clearErrors } from "../../redux/actions/userActions";
import EditIcon from '@mui/icons-material/Edit';
import { useAlert } from "react-alert";

export const AdminEditUserModal = ({
  userId,
  userName,
  userEmail,
  userRole,
}) => {
  const alert = useAlert();

  const { currentUser } = useSelector((state) => state.loginUser);

  const { loading, error, success } = useSelector(
    (state) => state.adminEditUserProfile
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    _id: userId,
    name: userName,
    email: userEmail,
    role: userRole,
  };
  const [updatedUser, setUpdatedUser] = useState(initialValues);

  const editonChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminEditUser(updatedUser, currentUser));
    setOpen(false);
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
      <EditIcon
      style={{
        cursor: "pointer",
        fontSize: "1.2rem",
        color: "blue",
      }}
      onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User Profile</DialogTitle>
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
            name="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            value={updatedUser.role}
            onChange={editonChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
