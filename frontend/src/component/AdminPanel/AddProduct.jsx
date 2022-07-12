import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import {
  adminAddProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { Validate } from "../../validation/AddProductValidation";

const AddProduct = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.adminAddProduct
  );
  const { currentUser } = useSelector((state) => state.loginUser);

  const addProductInitialValues = {
    productName: "",
    description: "",
    price: undefined,
    category: "",
    stock: undefined,
  };

  const [newProduct, setNewProduct] = useState(addProductInitialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errorsCount = Validate(newProduct);
    setFormErrors(errorsCount);
    if (Object.keys(errorsCount).length === 0) {
      dispatch(adminAddProduct(newProduct, currentUser));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product added successfully");
    }
  }, [error, alert, success]);

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
                <td data-label="ProductName">
                  {" "}
                  <input
                    type="text"
                    name="productName"
                    placeholder="Name"
                    value={newProduct.productName}
                    onChange={handleChange}
                  />
                  <p>{formErrors.productName ? formErrors.productName : " "}</p>
                </td>
                <td data-label="Description">
                  {" "}
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={handleChange}
                  />
                  <p>{formErrors.description ? formErrors.description : " "}</p>
                </td>
                <td data-label="Price">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleChange}
                  />
                  <p>{formErrors.price ? formErrors.price : " "}</p>
                </td>
                <td data-label="Category">
                  {" "}
                  <input
                    type="text"
                    name="category"
                    placeholder="Choose Category"
                    value={newProduct.category}
                    onChange={handleChange}
                  />
                </td>
                <td data-label="Stock">
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                  />
                  <p>{formErrors.stock ? formErrors.stock : " "}</p>
                </td>
                <td data-label="Image">
                      <input type="file" id="files" />
                      <label for="files">Select images</label>
                    </td>
                <td data-label="Add">
                  <button onClick={submitHandler}>Add the Product</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
