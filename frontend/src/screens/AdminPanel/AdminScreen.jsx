import React, { useState } from "react";
import MetaData from "../../component/Layout/MetaData";
import UsersList from "../../component/AdminPanel/UsersList";
import ProductsList from "../../component/AdminPanel/ProductsList";
import OrderList from "../../component/AdminPanel/OrdersList";
import AddProduct from "../../component/AdminPanel/AddProduct";
import AddAdmin from "../../component/AdminPanel/AddAdmin";

import "./AdminScreen.css";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const AdminScreen = () => {
  const [showUser, setShowUser] = useState(true);
  const [showProduct, setShowProduct] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const userHandler = () => {
    setShowUser(true);
    setShowProduct(false);
    setShowOrder(false);
    setShowAddProduct(false);
    setShowAddAdmin(false);
  };

  const productHandler = () => {
    setShowUser(false);
    setShowProduct(true);
    setShowOrder(false);
    setShowAddProduct(false);
    setShowAddAdmin(false);
  };

  const orderHandler = () => {
    setShowUser(false);
    setShowProduct(false);
    setShowOrder(true);
    setShowAddProduct(false);
    setShowAddAdmin(false);
  };

  const addProductHandler = () => {
    setShowUser(false);
    setShowProduct(false);
    setShowOrder(false);
    setShowAddProduct(true);
    setShowAddAdmin(false);
  };

  const addAdminHandler = () => {
    setShowUser(false);
    setShowProduct(false);
    setShowOrder(false);
    setShowAddProduct(false);
    setShowAddAdmin(true);
  };
  return (
    <React.Fragment>
      <MetaData title="AdminPanel" />
      <Header />
      <div className="container">
        <h1 className="page-title">
          {showUser
            ? "Users"
            : showProduct
            ? "Product"
            : showOrder
            ? "Orders"
            : showAddProduct
            ? "Add Products"
            : showAddAdmin && "Add Admin"}
        </h1>
        <div className="row my-20">
          <div className="admin-left">
            <div>
              <ul className="admin-panel-sidebar">
                <li key={1}>
                  <button
                    onClick={userHandler}
                    style={
                      showUser ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Users
                  </button>
                </li>
                <li key={2}>
                  <button
                    onClick={productHandler}
                    style={
                      showProduct ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Products
                  </button>
                </li>
                <li key={3}>
                  <button
                    onClick={orderHandler}
                    style={
                      showOrder ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Orders
                  </button>
                </li>
                <li key={4}>
                  <button
                    onClick={addProductHandler}
                    style={
                      showAddProduct
                        ? { color: "#ff7f50" }
                        : { color: "#607d8b" }
                    }
                  >
                    Add Products
                  </button>
                </li>
                <li key={5}>
                  <button
                    onClick={addAdminHandler}
                    style={
                      showAddAdmin ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Add Admin
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="admin-right">
            {showUser && <UsersList />}
            {showProduct && <ProductsList />}
            {showOrder && <OrderList />}
            {showAddProduct && <AddProduct />}
            {showAddAdmin && <AddAdmin />}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdminScreen;
