import { NavLink } from "react-router";
import { NAVIGATION, NAVIGATION_ROUTES } from "../constants/navigation.js";
import { useContext } from "react";
import { DataContext } from "../contexts/main.js";

export const Navigation = () => {
  const { symbolsData, threadsData, ordersData, archiveData } = useContext(DataContext);
  const list = NAVIGATION.map(({ path, name }) => {
    if (path === NAVIGATION_ROUTES.SYMBOLS) {
      return { path, name, count: Object.keys(symbolsData).length };
    } else if (path === NAVIGATION_ROUTES.ORDERS) {
      return { path, name, count: ordersData.length };
    } else if (path === NAVIGATION_ROUTES.ARCHIVE) {
      return { path, name, count: archiveData.length };
    } else if (path === NAVIGATION_ROUTES.THREADS) {
      return { path, name, count: threadsData.length };
    }
    return { path, name };
  });

  return (
    <nav className="ml-auto">
      <ul className="flex gap-8">
        {list.map(({ path, name, count }) => (
          <li key={path}>
            <NavLink to={path} className={({ isActive }) => "-mx-3 px-3 py-2 text-xl underline underline-offset-4 hover:no-underline " + (isActive ? "text-orange-500" : "")}>
              {name} ({count})
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
