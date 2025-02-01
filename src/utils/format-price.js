export const formatPrice = (price, decimals = 0) => {
  let decimalsCount = price.toString().split(".")[1]?.length || 0;
  decimalsCount = decimals === "auto" ? decimalsCount : decimals;

  return price.toLocaleString("en-US", {
    minimumFractionDigits: decimalsCount,
    maximumFractionDigits: decimalsCount,
  });
};
