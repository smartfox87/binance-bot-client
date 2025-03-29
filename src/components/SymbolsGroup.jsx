import { Symbols } from "./Symbols.jsx";

export const SymbolsGroup = ({ index, data }) => {
  if (!data) return null;
  const parsedData = JSON.parse(data);

  return (
    <section className="container py-4">
      <header className="flex items-center justify-between">
        <h2 className="font-black">Group #{index}</h2>
        <div className="flex gap-4">
          {parsedData && (
            <>
              <div className="">
                Iteration: <span className="">{parsedData.iteration}</span>
              </div>
              <div className="">
                Duration: <span className="">{parsedData.duration}</span>
              </div>
            </>
          )}
        </div>
      </header>
      {parsedData && <Symbols items={parsedData.items} />}
    </section>
  );
};
