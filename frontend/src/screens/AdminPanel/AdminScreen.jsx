import React, { useState } from "react";
import MetaData from "../../component/Layout/MetaData";
import UsersList from "../../component/AdminPanel/UsersList";
import ProductsList from "../../component/AdminPanel/ProductsList";
import OrderList from "../../component/AdminPanel/OrdersList";
import AddProduct from "../../component/AdminPanel/AddProduct";
import "./AdminScreen.css";

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
    <>
      <MetaData title="AdminPanel" />
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
        <div className="row">
          <div className="admin-left">
            <div>
              <ul className="admin-panel-sidebar">
                <li>
                  <button onClick={userHandler}>Users</button>
                </li>
                <li>
                  <button onClick={productHandler}>Products</button>
                </li>
                <li>
                  <button onClick={orderHandler}>Orders</button>
                </li>
                <li>
                  <button onClick={addProductHandler}>Add Products</button>
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
    </>
  );
};

export default AdminScreen;
