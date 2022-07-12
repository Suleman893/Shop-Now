import "./AdminPanel.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  deleteProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { AiFillDelete } from "react-icons/ai";
import { AdminEditProductModal } from "../Modals/AdminEditProductModal";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";

const ProductsList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUser);
  const { products, loading, error } = useSelector(
    (state) => state.adminPanelProducts
  );

  useEffect(() => {
    dispatch(getAdminProduct(currentUser));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const [open, setOpen] = React.useState(false);

  const handleEditProfileModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="table-container">
        {loading ? (
          <Loader />
        ) : (
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
                      <AdminEditProductModal
                        setOpen={setOpen}
                        open={open}
                        productId={curr._id}
                        productName={curr.productName}
                        productDesc={curr.description}
                        productStock={curr.stock}
                        productPrice={curr.price}
                        productRatings={curr.ratings}
                        productCategory={curr.category}
                      />
                    </td>
                    <td data-label="Delete">
                      <AiFillDelete
                        onClick={() =>
                          dispatch(deleteProduct(curr._id, currentUser))
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

export default ProductsList;
