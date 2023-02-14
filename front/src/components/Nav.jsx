import {NavLink} from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'

const Nav = (props) => {
  
   useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            Se connecter
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup">
            S'inscrire
          </NavLink>
        </li>
        <li>
          <NavLink to="/addArticle">
            Ajouter un article
          </NavLink>
        </li>
        <li>
          <NavLink to="/addComment">
            Ajouter un commentaire
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            Tous les utilisateurs
          </NavLink>
        </li>
        <li>
          <NavLink to="/articles">
            Tous les articles
          </NavLink>
        </li>
        <li>
          <NavLink to="/commentaires">
            Tous les commentaires
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;