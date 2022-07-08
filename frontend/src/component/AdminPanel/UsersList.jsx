import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../redux/actions/userActions";
import "./AdminPanel.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
const UsersList = () => {

  const {  currentUser } = useSelector((state) => state.loginUser);
  const { users, loading } = useSelector((state) => state.getAllUsersReducers);
  const dispatch = useDispatch();

  const { data } = users;
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
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
                  <td data-label="Edit">
                    <AiFillEdit />
                  </td>
                  <td data-label="Delete">
                    <AiFillDelete
                      onClick={()=>
                        dispatch(deleteUser(curr._id ,currentUser))
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
