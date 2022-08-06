import React, { useState } from "react";
import MetaData from "../../component/Layout/MetaData";
import UsersList from "../../component/AdminPanel/UsersList";
import ProductsList from "../../component/AdminPanel/ProductsList";
import OrderList from "../../component/AdminPanel/OrdersList";
import AddProduct from "../../component/AdminPanel/AddProduct";
import "./AdminScreen.css";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const AdminScreen = () => {
  const [showUser, setShowUser] = useState(true);
  const [showProduct, setShowProduct] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const userHandler = () => {
    setShowUser(true);
    setShowProduct(false);
    setShowOrder(false);
    setShowAddProduct(false);
  };

  const productHandler = () => {
    setShowUser(false);
    setShowProduct(true);
    setShowOrder(false);
    setShowAddProduct(false);
  };

  const orderHandler = () => {
    setShowUser(false);
    setShowProduct(false);
    setShowOrder(true);
    setShowAddProduct(false);
  };

  const addProductHandler = () => {
    setShowUser(false);
    setShowProduct(false);
    setShowOrder(false);
    setShowAddProduct(true);
  };
  return (
    <React.Fragment>
      <MetaData title="AdminPanel" />
      <Header/>
      <div className="container">
        <h1 className="page-title">
          {showUser
            ? "Users"
            : showProduct
            ? "Product"
            : showOrder
            ? "Orders"
            : showAddProduct && "Add Products"}
        </h1>
        <div className="row my-20">
          <div className="admin-left">
            <div>
              <ul className="admin-panel-sidebar">
                <li>
                  <button
                    onClick={userHandler}
                    style={
                      showUser ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={productHandler}
                    style={
                      showProduct ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={orderHandler}
                    style={
                      showOrder ? { color: "#ff7f50" } : { color: "#607d8b" }
                    }
                  >
                    Orders
                  </button>
                </li>
                <li>
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
              </ul>
            </div>
          </div>
          <div className="admin-right">
            {showUser && <UsersList />}
            {showProduct && <ProductsList />}
            {showOrder && <OrderList />}
            {showAddProduct && <AddProduct />}
          </div>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  );
};

export default AdminScreen;
