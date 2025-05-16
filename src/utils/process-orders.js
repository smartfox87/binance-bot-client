export const processOrders = (data, isCanceled) =>
  Object.values(data).reduce(
    (acc, orders) => acc.concat(Object.values(orders).filter(({ type, status }) => isCanceled || type !== "LIMIT" || (type === "LIMIT" && status !== "CANCELED" && !isCanceled))),
    [],
  );
