export const Validate = (newProduct) => {
  const errors = {};

  if (!newProduct.productName) {
    errors.productName = "productName  is required";
  } else if (
    newProduct.productName.length < 2 ||
    newProduct.productName.length > 15
  ) {
    errors.productName = "productName must be between 10 - 15 digits";
  }

  if (!newProduct.description) {
    errors.description = "description  is required";
  } else if (
    newProduct.description.length < 10 ||
    newProduct.description.length > 40
  ) {
    errors.description = "description must be between 10 - 15 digits";
  }

  if (!newProduct.price) {
    errors.price = "price  is required";
  } else if (newProduct.price.length < 0 || newProduct.price.length > 10) {
    errors.price = "productName must be between 10 - 3 digits";
  }

  if (!newProduct.stock) {
    errors.stock = "stock  is required";
  } else if (newProduct.stock.length < 0 || newProduct.stock.length > 3) {
    errors.stock = "stock must be between 10 - 3 digits";
  }
  return errors;
};
