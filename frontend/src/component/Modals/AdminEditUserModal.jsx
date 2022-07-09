import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from '../../redux/actions/userActions';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export const AdminEditUserModal = ({userId,userName,userEmail,userPassword,userConfirmPassword}) => {
console.log("tHe user",userName, userEmail,userPassword,userConfirmPassword);
  const {  currentUser,loggedInUserInfo } = useSelector((state) => state.loginUser);
const dispatch=useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    _id:userId,
    name:userName,
    email:userEmail,
    password:userPassword,
    confirmPassword:userConfirmPassword
  }
  const [updatedUser, setUpdatedUser] = useState(initialValues);

  const editonChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    console.log('The updateuser',updatedUser)
    e.preventDefault();
    dispatch(editUserProfile(updatedUser,currentUser));
    setOpen(false);
  };

  return (
    <div>
      <button  onClick={handleClickOpen}>
      <AiFillEdit 
                  
                  />
      </button>
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