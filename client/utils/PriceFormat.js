export const priceFormat = (value) => {
  let price = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  });
  return price.format(value);
};
