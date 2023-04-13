import { NavLink } from "react-router-dom";
import { useContext} from 'react'
import { StoreContext } from "../tools/context.js"

const NavAdmin = ({ handleLinkClick }) => {
  const [state] = useContext(StoreContext);

  // Vérifiez si l'utilisateur est connecté et s'il a le rôle admin
  const isAdmin = state.isLogged && state.user.roles_id === 1;

  if (!isAdmin) {
    return null; // Si l'utilisateur n'est pas admin, ne rien afficher
  }

  return (
    <nav>
      <hr /> {/* Démarcation après NavAdmin */}
      <ul>
        <li>
          <NavLink to="/reviews" onClick={handleLinkClick}>
            Tous les avis
          </NavLink>
        </li>
        <li>
          <NavLink to="/contactadmin" onClick={handleLinkClick}>
            Tous les messages
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" onClick={handleLinkClick}>
            Tous les produits
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" onClick={handleLinkClick}>
            Tous les utilisateurs
          </NavLink>
        </li>
      </ul>
      <hr /> {/* Démarcation après NavAdmin */}
    </nav>
  );
};


export default NavAdmin;
