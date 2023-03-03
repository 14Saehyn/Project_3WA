import { NavLink } from "react-router-dom";

const Footer = () => {
    
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/legalnotice">
            Mentions légales
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
