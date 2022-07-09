import React, { useState } from "react";
import { adminAddProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.adminAddProductReducer);
  const {  currentUser } = useSelector((state) => state.loginUser);

  const addProductInitialValues = {
    productName: "",
    description: "",
    price: undefined,
    category: "",
    stock: undefined,
  };

  const [newProduct, setNewProduct] = useState(addProductInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminAddProduct(newProduct,currentUser));
  };
  return (
    <div>
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ProductName</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                  <td data-label="ProductName">  <input
                  name="productName"
                  placeholder="Name"
                  value={newProduct.productName}
                  onChange={handleChange}
                /></td>
                  <td data-label="Description">  <input
                  name="description"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={handleChange}
                /></td>
                  <td data-label="Price"><input
                  name="price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleChange}
                /></td>
                  <td data-label="Category"> <input
                  name="category"
                  placeholder="Choose Category"
                  value={newProduct.category}
                  onChange={handleChange}
                /></td>
                  <td data-label="Stock">
                  <input
                  name="stock"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={handleChange}
                />
                  </td>
                  <td data-label="Add">
                  <button onClick={submitHandler}>Add the Product</button>
                  </td>
              </tr>
        </tbody>
      </table>
    </div>
  </div>


  );
};

export default AddProduct;
