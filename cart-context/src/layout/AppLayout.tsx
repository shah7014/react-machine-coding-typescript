import { NavLink, Outlet } from "react-router-dom";
import "./AppLayout.scss";

const AppLayout = () => {
  return (
    <div className="applayout">
      <header className="header">
        <h1 className="header__title">
          <NavLink to={"/"}>Shooper</NavLink>
        </h1>
        <nav>
          <ul className="header__navlist">
            <li className="header__navlist-item">
              <NavLink to={"/"}>Products</NavLink>
            </li>

            <li className="header__navlist-item">
              <NavLink to={"/cart"}>Cart</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
