import {NavLink} from "react-router-dom";
import {useEffect, useContext} from 'react'
import axios from 'axios'
import {StoreContext} from "../tools/context.js"

const Nav = (props) => {
  const [state] = useContext(StoreContext)
  
  useEffect(() => {
    if (!axios.defaults.headers.common["Authorization"]) {
      const token = localStorage.getItem("jwtToken")
      if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer" + token
      }
    }
  },[])
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Accueil
          </NavLink>
        </li>
        <li>
        {!state.isLogged &&
          <NavLink to="/signup">
            S'inscrire
          </NavLink>
        }
        </li>
        <li>
        {state.isLogged ?
          (<NavLink to={`/profile/${state.user.id}`}>
            Mon profil
          </NavLink>)
            :
          (<NavLink to="/login">
            Se connecter
          </NavLink>)
        }
        </li>
        <li>
          <NavLink to="/admin">
            Panel Admin
          </NavLink>
          <ul>
            <li>
              <NavLink to="/addProducts">
                Ajouter un produit
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">
                Tous les utilisateurs
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">
                Tous les produits
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/collections">
            Nos collections
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;