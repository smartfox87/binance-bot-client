export const processOrders = (data, isCanceled) =>
  Object.values(data).reduce((acc, orders) => acc.concat(Object.values(orders).filter(({ status }) => isCanceled || (status !== "CANCELED" && !isCanceled))), []);
