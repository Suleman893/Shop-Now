import "./AdminPanel.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct,deleteProduct } from "../../redux/actions/productAction";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {AdminEditProductModal} from "../Modals/AdminEditProductModal";

const ProductsList = () => {
  const {  currentUser } = useSelector((state) => state.loginUser);

  const { products } = useSelector((state) => state.adminPanelProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProduct(currentUser));
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);

const handleEditProfileModal = () => {
  setOpen(!open);
};
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
              products.map((curr) => (
                <tr>
                  
                    <td data-label="ProductId">{curr._id}</td>
                    <td data-label="Name">{curr.productName}</td>
                    <td data-label="Stock">{curr.stock}</td>
                    <td data-label="Price">{curr.price}</td>
                    <td data-label="Edit">
                    <AdminEditProductModal setOpen={setOpen} open={open} productId={curr._id} productName={curr.productName} 
                    productDesc={curr.description}
                    
                    productStock={curr.stock} productPrice={curr.price} productRatings={curr.ratings} productCategory={curr.category}/>
                    </td>
                    <td data-label="Delete">
                      <AiFillDelete 
                      onClick={()=>
                        dispatch(deleteProduct(curr._id,currentUser))
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
