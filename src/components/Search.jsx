import { useSearchParams } from "react-router";

export const Search = ({ param }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = ({ target }) => {
    setSearchParams({ ...searchParams, [param]: target.value });
  };

  return <input value={searchParams.get(param)} type="text" className="w-96 border border-l-gray-300 px-3 py-1.5" onInput={handleChange} placeholder="Search" />;
};
