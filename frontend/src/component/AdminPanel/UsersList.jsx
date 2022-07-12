import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  clearErrors,
} from "../../redux/actions/userActions";
import "./AdminPanel.css";
import { AiFillDelete } from "react-icons/ai";
import { AdminEditUserModal } from "../Modals/AdminEditUserModal";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";

const UsersList = () => {
  const alert = useAlert();
  const { currentUser } = useSelector((state) => state.loginUser);
  const { users, loading, error } = useSelector(
    (state) => state.getAllUsersReducers
  );
  const dispatch = useDispatch();
  // const {  delLoading,delError , delSuccess} = useSelector((state) => state.deleteSpecificUser);
  const { data } = users;

  useEffect(() => {
    dispatch(getAllUsers(currentUser));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const [open, setOpen] = React.useState(false);

  const handleEditProfileModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="table-container">
        {loading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((curr) => (
                  <tr>
                    <td data-label="UserId">{curr._id}</td>
                    <td data-label="Email">{curr.email}</td>
                    <td data-label="Name">{curr.name}</td>
                    <td data-label="Role">{curr.role}</td>
                    <td data-label="Image">
                      <input type="file" id="files" />
                      <label for="files">Select image</label>
                    </td>
                    <td data-label="Edit">
                      <AdminEditUserModal
                        setOpen={setOpen}
                        open={open}
                        userId={curr._id}
                        userName={curr.name}
                        userEmail={curr.email}
                        userRole={curr.role}
                        userPassword={curr.password}
                        userConfirmPassword={curr.confirmPassword}
                      />
                    </td>
                    <td data-label="Delete">
                      <AiFillDelete
                        onClick={() =>
                          dispatch(deleteUser(curr._id, currentUser))
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersList;
