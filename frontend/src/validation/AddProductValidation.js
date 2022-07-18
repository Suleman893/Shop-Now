export const Validate = (newProduct) => {
  const errors = {};

  if (!newProduct.productName) {
    errors.productName = "Required field";
  } else if (
    newProduct.productName.length < 2 ||
    newProduct.productName.length > 15
  ) {
    errors.productName = "Must be 10 - 15 length";
  }
  if (!newProduct.description) {
    errors.description = "Required Field";
  } else if (
    newProduct.description.length < 10 ||
    newProduct.description.length > 40
  ) {
    errors.description = "Must be 10 - 15 length";
  }

  if (!newProduct.price) {
    errors.price = "Required Field";
  } else if (newProduct.price.length < 0 || newProduct.price.length > 10) {
    errors.price = "Must be 0 - 10 length";
  }
  if (!newProduct.category) {
    errors.category = "Required Field";
  }
  if (!newProduct.stock) {
    errors.stock = "Required Field";
  } else if (newProduct.stock.length < 0 || newProduct.stock.length > 3) {
    errors.stock = "Must be 0 - 3 length";
  }
  return errors;
};
