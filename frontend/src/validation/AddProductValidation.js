export const Validate = (newProduct) => {
  const errors = {};
  if (!newProduct.productName) {
    errors.productName = "Product name is required";
    return errors;
  } else if (
    newProduct.productName.length < 30 ||
    newProduct.productName.length > 40
  ) {
    errors.productName = "Product name must be 30 - 40 length";
    return errors;
  }
  if (!newProduct.description) {
    errors.description = "Product description is required";
    return errors;
  } else if (
    newProduct.description.length < 10 ||
    newProduct.description.length > 400
  ) {
    errors.description = "Product description must be 20 - 400 length";
    return errors;
  }
  if (!newProduct.price) {
    errors.price = "Product price is required";
    return errors;
  } else if (newProduct.price.length < 0 || newProduct.price.length > 8) {
    errors.price = "Product price must be 0-8 characters";
    return errors;
  }
  if (!newProduct.category) {
    errors.category = "Product category is required";
    return errors;
  }
  if (!newProduct.stock) {
    errors.stock = "Product stock is required";
    return errors;
  } else if (newProduct.stock.length < 0 || newProduct.stock.length > 3) {
    errors.stock = "Product stock must be 0-3 characters";
    return errors;
  }
  return errors;
};
