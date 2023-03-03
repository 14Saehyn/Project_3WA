import {NavLink} from "react-router-dom";
import {useEffect, useContext} from 'react'
import axios from 'axios'
import {StoreContext} from "../tools/context.js"
import NavAdmin from "./NavAdmin.jsx";

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
        {!state.isLogged &&
          <li>
            <NavLink to="/signup">
              S'inscrire
            </NavLink>
        </li>
        }
        {state.isLogged ?
          (<li>
            <NavLink to={`/profile/${state.user.id}`}>
              Mon profil
            </NavLink>
          </li>)
            :
          (<li>
            <NavLink to="/login">
              Se connecter
            </NavLink>
          </li>)
        }
        <NavAdmin />
        <li>
          <NavLink to="/collections">
            Nos collections
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            Contact
          </NavLink>
        </li>
        {state.isLogged &&
        <li>
          <NavLink to="/cart">
            Panier
          </NavLink>
        </li>
        }
      </ul>
    </nav>
  );
};

export default Nav;