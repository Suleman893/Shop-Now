import "./AdminPanel.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct,deleteProduct } from "../../redux/actions/productAction";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const ProductsList = () => {
  const {  currentUser } = useSelector((state) => state.loginUser);

  const { products } = useSelector((state) => state.adminPanelProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ProductId</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((current) => (
                <tr>
                  
                    <td data-label="ProductId">{current._id}</td>
                    <td data-label="Name">{current.productName}</td>
                    <td data-label="Stock">{current.stock}</td>
                    <td data-label="Price">{current.price}</td>
                    <td data-label="Edit">
                      <Link to={`/admin/editProduct/${current._id}`}>
                        <AiFillEdit style={{ cursor: "pointer" }} />
                      </Link>
                    </td>
                    <td data-label="Delete">
                      <AiFillDelete 
                      onClick={()=>
                        dispatch(deleteProduct(current._id,currentUser))
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

export default ProductsList;
