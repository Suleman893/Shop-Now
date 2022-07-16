import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../redux/actions/orderActions";
import "./AdminPanel.css";
import { AiFillDelete } from "react-icons/ai";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orders, loading, error } = useSelector(
    (state) => state.adminGetAllOrder
  );
  const { currentUser } = useSelector((state) => state.loginUser);
  const { delError, delSuccess } = useSelector(
    (state) => state.deleteSpecificOrder
  );

  useEffect(() => {
    dispatch(getAllOrders(currentUser));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (delError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (delSuccess) {
      alert.success("Order deleted ");
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, delSuccess, delError]);

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="table-container">
        {loading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <td>OrderId</td>
                <th>UserName</th>
                <th>Total Bill</th>
                <th>ProductName</th>
                <th>Qty</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((curr) => (
                  <tr>
                    <td data-label="OrderId">{curr._id}</td>
                    <td data-label="UserName">{curr.name}</td>
                    <td data-label="Total Bill">{curr.orderAmount}</td>
                    {curr.orderItems.map((c) => (
                      <React.Fragment>
                        <td data-label="ProductName">{c.name}</td>
                        <td data-label="Qty">{c.qty}</td>
                      </React.Fragment>
                    ))}

                    {/*<td data-label="Edit">
                    <AdminEditUserModal setOpen={setOpen} open={open} userId={curr._id} userName={curr.name} userEmail={curr.email} userPassword={curr.password} userConfirmPassword={curr.confirmPassword}/>
                    </td>*/}
                    <td data-label="Delete">
                      <AiFillDelete
                        style={{
                          fontSize: "1.2rem",
                          color: "red",
                        }}
                        onClick={() =>
                          dispatch(deleteOrder(curr._id, currentUser))
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No orders found</h1>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderList;
