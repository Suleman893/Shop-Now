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

  const [formErrors, setFormErrors] = useState({});
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

  let errorsCount;
  const myForm = new FormData();

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const newProduct = {
      productName,
      description,
      price,
      category,
      stock,
    };
    errorsCount = Validate(newProduct);
    setFormErrors(errorsCount);

    myForm.set("productName", productName);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
  };

  if (Object.keys(errorsCount).length === 0) {
    dispatch(adminAddProduct(myForm, currentUser));
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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
                <form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <td data-label="ProductName">
                    {" "}
                    <input
                      type="text"
                      placeholder="Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <p>
                      {formErrors.productName ? formErrors.productName : " "}
                    </p>
                  </td>
                  <td data-label="Description">
                    {" "}
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p>
                      {formErrors.description ? formErrors.description : " "}
                    </p>
                  </td>
                  <td data-label="Price">
                    <input
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <p>{formErrors.price ? formErrors.price : " "}</p>
                  </td>
                  <td data-label="Category">
                    {" "}
                    <input
                      type="text"
                      placeholder="Choose Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <p>{formErrors.category ? formErrors.category : " "}</p>
                  </td>
                  <td data-label="Stock">
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <p>{formErrors.stock ? formErrors.stock : " "}</p>
                  </td>
                  <td data-label="Image">
                    <label for="file-input">
                      <InsertPhotoIcon
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          fontSize: "1.2rem",
                        }}
                      />
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                    />
                  </td>
                  <td>
                    <AddIcon
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                      type="submit"
                      id="createProductBtn"
                    >
                      Add the Product
                    </AddIcon>
                  </td>
                </form>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
