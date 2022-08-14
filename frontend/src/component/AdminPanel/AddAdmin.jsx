import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import {
  adminAddProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { Validate } from "../../validation/SignUpValidation";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddIcon from "@mui/icons-material/Add";
import { addAdmin } from "../../redux/actions/userActions";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.addAdmin);
  const { currentUser } = useSelector((state) => state.loginUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const newAdminHandler = (e) => {
    e.preventDefault();
    const user = { name, email, password, confirmPassword, previewSource };
    const errorsCount = Validate(user);
    setFormErrors(errorsCount);
    if (Object.keys(errorsCount).length === 0) {
      if (!previewSource) {
        alert.error("Image is required");
      }
      dispatch(addAdmin(user, currentUser));
    }
  };

  useEffect(() => {
    if (formErrors.name) {
      alert.error(formErrors.name);
      return;
    }
    if (formErrors.email) {
      alert.error(formErrors.email);
      return;
    }
    if (formErrors.password) {
      alert.error(formErrors.password);
      return;
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return;
    }
    if (success) {
      alert.success("Admin added");
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success, formErrors]);

  return (
    <div>
      <div className="table-container">
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={newAdminHandler}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Confirm Password</th>
                  <th>Image</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Name">
                    {" "}
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td data-label="Email">
                    {" "}
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                  <td data-label="Password">
                    <input
                      type="text"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </td>
                  <td data-label="Confirm Password">
                    {" "}
                    <input
                      type="text"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </td>
                  <td data-label="Image">
                    <input
                      type="file"
                      name="image"
                      value={fileInput}
                      onChange={handleFileInputChange}
                    />
                  </td>
                  <td>
                    {/*  <AddIcon
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                      type="submit"
                      id="createProductBtn"
                    >
                      Add the Product
                    </AddIcon> */}
                    <input type="submit" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddAdmin;
