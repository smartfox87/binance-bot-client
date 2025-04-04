import { useContext } from "react";
import { DataContext } from "../contexts/main.js";

export const ThreadsPage = () => {
  const { threadsData } = useContext(DataContext);

  if (!threadsData) return null;

  return (
    <section className="container py-4">
      <ul className="">
        <li className="flex items-center justify-between border-b border-gray-300 py-2">
          <div className="w-1/12 grow border-r border-gray-300 px-2">Group</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">Iteration</div>
          <div className="w-1/12 grow border-r border-gray-300 px-2">Duration</div>
          <div className="w-1/12 grow px-2">Items</div>
        </li>
        {threadsData.map(({ index, iteration, duration, items }) => (
          <li key={index} className="flex justify-between border-b border-gray-300 py-2">
            <div className="w-1/12 grow border-r border-gray-300 px-2">{index}</div>
            <div className="w-1/12 grow border-r border-gray-300 px-2">{iteration}</div>
            <div className="w-1/12 grow border-r border-gray-300 px-2">{duration} ms</div>
            <div className="w-1/12 grow border-r border-gray-300 px-2">{items}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
