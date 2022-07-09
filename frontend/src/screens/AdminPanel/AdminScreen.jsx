import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsList from "../../component/AdminPanel/ProductsList";
import OrdersList from "../../component/AdminPanel/OrdersList";
import AddProduct from "../../component/AdminPanel/AddProduct";

import "./AdminScreen.css";
import UsersList from "../../component/AdminPanel/UsersList";
const AdminScreen = () => {
  const navigate = useNavigate;
  const userState = useSelector((state) => state.loginUser);
  const { currentUser } = userState;
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null ||
      !currentUser.role === "admin"
    ) {
      window.location.href = "/products";
    }
  }, [navigate]);

  return (
    <>
      <div className="container">
        <h1 className="page-title">Admin panel</h1>
        <div className="row">
          <div className="admin-left">
            <div>
              <ul className="admin-panel-sidebar">
                <li>
                  <button onClick={() => navigate("/admin/userList")}>
                    Users
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/admin/productList")}>
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/admin/orderList")}>
                    Orders
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/admin/addProduct")}>
                    Add Products
                  </button>
                </li>
              
              </ul>
            </div>
          </div>
          <div className="admin-right">
            <UsersList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminScreen;
