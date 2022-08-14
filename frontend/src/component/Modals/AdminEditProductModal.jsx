import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, clearErrors } from "../../redux/actions/productAction";
import EditIcon from "@mui/icons-material/Edit";
import { useAlert } from "react-alert";
import "./ModalStyling.css";
import { Validate } from "../../validation/AddProductValidation";

export const AdminEditProductModal = ({
  productId,
  productName,
  productDesc,
  productStock,
  productPrice,
  productCategory,
}) => {
  const alert = useAlert();

  const { currentUser } = useSelector((state) => state.loginUser);

  const { loading, error, success } = useSelector(
    (state) => state.adminEditProduct
  );

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    productId: productId,
    productName: productName,
    description: productDesc,
    price: productPrice,
    category: productCategory,
    stock: productStock,
  };
  const [updateProduct, setUpdatedProduct] = useState(initialValues);

  const editOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errorsCount = Validate(updateProduct);
    if (errorsCount.productName) {
      alert.error(errorsCount.productName);
    }
    if (errorsCount.description) {
      alert.error(errorsCount.description);
    }
    if (errorsCount.price) {
      alert.error(errorsCount.price);
    }
    if (errorsCount.category) {
      alert.error(errorsCount.category);
    }
    if (errorsCount.stock) {
      alert.error(errorsCount.stock);
    }
    if (Object.keys(errorsCount).length === 0) {
      dispatch(editProduct(updateProduct, currentUser));
      setOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Updated");
      dispatch(clearErrors());
    }
  }, [dispatch, error, success, alert]);

  return (
    <React.Fragment>
      <EditIcon
        onClick={handleClickOpen}
        style={{
          cursor: "pointer",
          fontSize: "1.2rem",
          color: "blue",
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="productName"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={updateProduct.productName}
            onChange={editOnChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={updateProduct.description}
            onChange={editOnChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="price"
            label="price"
            type="number"
            fullWidth
            variant="standard"
            value={updateProduct.price}
            onChange={editOnChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={updateProduct.category}
            onChange={editOnChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="stock"
            label="Stock"
            type="text"
            fullWidth
            variant="standard"
            value={updateProduct.stock}
            onChange={editOnChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
