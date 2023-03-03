import { NavLink } from "react-router-dom";
import { useContext } from 'react'
import { StoreContext } from "../tools/context.js"

const NavAdmin = () => {
  const [state] = useContext(StoreContext);

  // Vérifiez si l'utilisateur est connecté et s'il a le rôle admin
  const isAdmin = state.isLogged && state.user.roles_id === 1;

  if (!isAdmin) {
    return null; // Si l'utilisateur n'est pas admin, ne rien afficher
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/reviews">
            Tous les avis
          </NavLink>
        </li>
        <li>
          <NavLink to="/products">
            Tous les produits
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            Tous les utilisateurs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavAdmin;
