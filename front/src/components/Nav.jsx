import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/profil">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/react">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/html">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/testme">
            profil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;