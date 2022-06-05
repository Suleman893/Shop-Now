import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";
const EditProduct = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  console.log("the product is ", product);
  useEffect(() => {
    dispatch(getProductDetails(param.id));
  }, [dispatch]);
  return (
    <div>
      <h1>Edit EditProduct</h1>
    </div>
  );
};

export default EditProduct;
