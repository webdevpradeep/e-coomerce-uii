export const discountedPrice = (price, disc) => {
  return price - (price * disc) / 100;
};

export const paiseToRupee = (paise) => {
  return paise / 100;
};
