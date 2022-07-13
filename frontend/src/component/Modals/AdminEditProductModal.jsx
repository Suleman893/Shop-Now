import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, clearErrors } from "../../redux/actions/productAction";
import { AiFillEdit } from "react-icons/ai";
import { useAlert } from "react-alert";

export const AdminEditProductModal = ({
  productId,
  productName,
  productDesc,
  productStock,
  productPrice,
  productRatings,
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
    ratings: productRatings,
    category: productCategory,
    stock: productStock,
  };
  const [updateProduct, setUpdatedProduct] = useState(initialValues);

  const editonChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editProduct(updateProduct, currentUser));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Profile updated");
      dispatch(clearErrors());
    }
  }, [dispatch, error, success, alert]);

  return (
    <div>
      <button onClick={handleClickOpen}>
        <AiFillEdit />
      </button>
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
            onChange={editonChangeHandler}
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
            onChange={editonChangeHandler}
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
            onChange={editonChangeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            name="ratings"
            label="Ratings"
            type="number"
            fullWidth
            variant="standard"
            value={updateProduct.ratings}
            onChange={editonChangeHandler}
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
            onChange={editonChangeHandler}
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
            onChange={editonChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
