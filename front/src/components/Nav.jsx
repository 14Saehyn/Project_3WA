import {NavLink} from 'react-router-dom';
import {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import {StoreContext} from '../tools/context.js';
import NavAdmin from './NavAdmin.jsx';

const Nav = (props) => {
  const [state] = useContext(StoreContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!axios.defaults.headers.common['Authorization']) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
      }
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className="nav-all">
        <div className="navbar-container">
          <button className="burger-menu" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
          <button className="burger-menu close-menu" onClick={toggleMenu}>
            ✖
          </button>
          <div className="nav-menu-container">
            <ul>
              <li>
                <NavLink to="/" onClick={handleLinkClick}>
                  Accueil
                </NavLink>
              </li>
              {!state.isLogged && (
                <li>
                  <NavLink to="/signup" onClick={handleLinkClick}>
                    S'inscrire
                  </NavLink>
                </li>
              )}
              {state.isLogged ? (
                <li>
                  <NavLink to={`/profile/${state.user.id}`} onClick={handleLinkClick}>
                    Mon profil
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" onClick={handleLinkClick}>
                    Se connecter
                  </NavLink>
                </li>
              )}
              <NavAdmin handleLinkClick={handleLinkClick} />
              <li>
                <NavLink to="/collections" onClick={handleLinkClick}>
                  Collections
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={handleLinkClick}>
                  Contact
                </NavLink>
              </li>
              {state.isLogged && (
                <li>
                  <NavLink to="/cart" onClick={handleLinkClick}>
                    Panier
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;