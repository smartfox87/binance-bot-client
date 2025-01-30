export const Symbols = ({ items }) => {
  console.log(items);
  return (
    <ul className="">
      <li className="flex items-center justify-between border-b border-gray-300 py-2">
        <div className="w-10">Name</div>
        <div className="w-10">Price</div>
        <div className="w-16">Amount limit USD</div>
        <div className="w-10">Price change</div>
        <div className="w-16">Volume USD</div>
        <div className="w-10 grow">Bids</div>
        <div className="w-10 grow">Asks</div>
      </li>
      {items.map(
        (
          {
            items: [
              name,
              price,
              amount_limit_usd,
              price_change,
              volume,
              bids,
              asks,
            ],
          },
          index,
        ) => (
          <li key={index}>
            <div className="w-10">{name}</div>
            <div className="w-10">{price}</div>
            <div className="w-16">{amount_limit_usd}</div>
            <div className="w-10">{price_change}</div>
            <div className="w-16">{volume}</div>
            <div className="w-10 grow">{bids}</div>
            <div className="w-10 grow">{asks}</div>
          </li>
        ),
      )}
    </ul>
  );
};
