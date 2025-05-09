export const processSymbols = (data, searchParams) => {
  return data.reduce(
    (acc, { data: { items } }) => ({
      ...acc,
      ...items
        .filter(([symbol]) => !searchParams.get("symbols_query") || symbol.includes(searchParams.get("symbols_query").toUpperCase()))
        .reduce((acc, item) => {
          const bids = Object.keys(item[5]).sort((a, b) => parseFloat(b) - parseFloat(a));
          const asks = Object.keys(item[6]).sort((a, b) => parseFloat(a) - parseFloat(b));
          item[5] = bids.reduce((acc, key) => ({ ...acc, [key]: item[5][key] }), {});
          item[6] = asks.reduce((acc, key) => ({ ...acc, [key]: item[6][key] }), {});
          const order = bids.length ? bids[0] : asks[0];
          // const orderAmount = bids.length ? item[5][order] : item[6][order];
          // console.log(`orderAmount`, orderAmount);
          // if (isLimitedSymbols && orderAmount < item[4] * ORDERS_AMOUNT_LIMIT_MULTIPLIER) return acc;
          return { ...acc, [item[0]]: [...item, order] };
        }, {}),
    }),
    {},
  );
};
