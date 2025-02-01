import { NavLink } from "react-router";
import { NAVIGATION } from "../constants/navigation.js";

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex gap-8">
        {NAVIGATION.map(({ path, name }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                "-mx-3 px-3 py-2 text-xl underline underline-offset-4 hover:no-underline " +
                (isActive ? "text-orange-500" : "")
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
