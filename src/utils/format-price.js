export const formatPrice = (price, decimals = 0) => {
  const parsedPrice = parseFloat(price);
  let decimalsCount = parsedPrice.toString().split(".")[1]?.length || 0;
  decimalsCount = decimals === "auto" ? decimalsCount : decimals;

  return parseFloat(parsedPrice).toLocaleString("en-US", {
    minimumFractionDigits: decimalsCount,
    maximumFractionDigits: decimalsCount,
  });
};
