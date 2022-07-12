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
  const alert = useAlert();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.adminGetAllOrderReducer
  );
  const { currentUser } = useSelector((state) => state.loginUser);
  useEffect(() => {
    dispatch(getAllOrders(currentUser));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

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
                <th>UserName</th>
                <th>OrderAmount</th>
                <th>TransactionId</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((curr) => (
                  <tr>
                    <td data-label="UserName">{curr.name}</td>
                    <td data-label="OrderAmount">{curr.orderAmount}</td>
                    <td data-label="TransactionId">{curr.transactionId}</td>
                    {/*<td data-label="Edit">
                    <AdminEditUserModal setOpen={setOpen} open={open} userId={curr._id} userName={curr.name} userEmail={curr.email} userPassword={curr.password} userConfirmPassword={curr.confirmPassword}/>
                    </td>*/}
                    <td data-label="Delete">
                      <AiFillDelete
                        onClick={() =>
                          dispatch(deleteOrder(curr._id, currentUser))
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderList;
