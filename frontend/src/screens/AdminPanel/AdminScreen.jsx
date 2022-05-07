import React from "react";
import {Link} from "react-router-dom";
const AdminScreen = () => {
  return (
    <>
      <h1>Admin panel</h1>
      <h1>
        Four buttons on left with functionality of
        <Link to="/admin/userList">All Users</Link>,
        <Link to="/admin/productsList">All Products</Link>
        <Link to="/admin/addNewProduct">Add New Products</Link>
        <Link to="/admin/ordersList">All Order</Link>
      </h1>
    </>
  );
};

export default AdminScreen;
