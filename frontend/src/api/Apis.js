//User Api's
export const registerUserApi = "http://localhost:2000/api/user/register";
export const loginUserApi = "http://localhost:2000/api/user/login";
export const deleteUserApi = "http://localhost:2000/api/user/userInfo/delete";
export const getAllUsersApi = "http://localhost:2000/api/user/admin/users";
export const userCanUpdateItselfApi =
  "http://localhost:2000/api/user/userInfo/update";
export const deleteSpecificUserApi =
  "http://localhost:2000/api/user/admin/deleteUser";
export const adminCanUpdateUser =
  "http://localhost:2000/api/user/admin/updateUser";
export const userCanUpdateItsPassword =
  "http://localhost:2000/api/user/updatePassword";
export const addAdminApi = "http://localhost:2000/api/user/addAdmin";

//Product Api's
export const getlatestProductsApi =
  "http://localhost:2000/api/product/latestProduct";
export const getProductDetailApi = "http://localhost:2000/api/product/product";
export const getFeaturedProductApi =
  "http://localhost:2000/api/featuredProduct";
export const searchProductApi =
  "http://localhost:2000/api/product/searchProduct";
export const getProductByCategoryApi =
  "http://localhost:2000/api/product/productbycategory";
export const putReviewsApi = "http://localhost:2000/api/product/productreview";
export const deleteProductApi =
  "http://localhost:2000/api/product/admin/product";
export const updateProductApi =
  "http://localhost:2000/api/product/admin/product";
export const adminAddNewProductApi =
  "http://localhost:2000/api/product/admin/product/new";
export const adminGetAllProductsApi =
  "http://localhost:2000/api/product/adminproducts";

//Order Api's
export const placeOrderApi = "http://localhost:2000/api/order/placeOrder";
export const getOrdersApi = "http://localhost:2000/api/order/getUserOrder";
export const allOrdersApi = "http://localhost:2000/api/order/admin/orders";
export const deleteOrderApi = "http://localhost:2000/api/order/delete/orders";

//Subscribe Api
export const subscribeEmailApi = "http://localhost:2000/api/mail/sendmail";
