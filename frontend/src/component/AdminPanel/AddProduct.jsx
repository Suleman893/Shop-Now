import React, { useState } from "react";
import { adminAddProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.adminAddProductReducer);

  const addProductInitialValues = {
    productName: "",
    productDescription: "",
    productPrice: 0,
    productCategory: "",
    productStock: 20,
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
    dispatch(adminAddProduct(newProduct));
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        name="productName"
        placeholder="productName"
        value={newProduct.productName}
        onChange={handleChange}
      />
      <input
        name="productDescription"
        placeholder="productDescription"
        value={newProduct.productDescription}
        onChange={handleChange}
      />
      <input
        name="productPrice"
        placeholder="productPrice"
        value={newProduct.productPrice}
        onChange={handleChange}
      />
      <input
        name="productCategory"
        placeholder="Choose Category"
        value={newProduct.productCategory}
        onChange={handleChange}
      />
      <input
        name="productStock"
        placeholder="Stock"
        value={newProduct.productStock}
        onChange={handleChange}
      />

      <button type="submit">Add new Product</button>
    </form>
  );
};

export default AddProduct;
