import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import {
  adminAddProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { Validate } from "../../validation/AddProductValidation";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddIcon from "@mui/icons-material/Add";

const AddProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector(
    (state) => state.adminAddProduct
  );
  const { currentUser } = useSelector((state) => state.loginUser);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product added");
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  };
  let newProduct;
  newProduct = {
    productName,
    description,
    price,
    category,
    stock,
    images,
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const errorsCount = Validate(newProduct);
    if (errorsCount.productName) {
      alert.error(errorsCount.productName);
    }
    if (errorsCount.description) {
      alert.error(errorsCount.description);
    }
    if (errorsCount.price) {
      alert.error(errorsCount.price);
    }
    if (errorsCount.category) {
      alert.error(errorsCount.category);
    }
    if (errorsCount.stock) {
      alert.error(errorsCount.stock);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (Object.keys(errorsCount).length === 0) {
      dispatch(adminAddProduct(newProduct, currentUser));
    }
  };

  return (
    <div>
      <div className="table-container">
        {loading ? (
          <Loader />
        ) : (
          <form
            id="createProductBtn"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>ProductName</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Image</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="ProductName">
                    {" "}
                    <input
                      type="text"
                      placeholder="Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </td>
                  <td data-label="Description">
                    {" "}
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                  <td data-label="Price">
                    <input
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                  <td data-label="Category">
                    {" "}
                    <input
                      type="text"
                      placeholder="Choose Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </td>
                  <td data-label="Stock">
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </td>
                  <td data-label="Image">
                    <input
                      type="file"
                      id="formupload"
                      name="image"
                      multiple
                      onChange={handleImage}
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

export default AddProduct;
