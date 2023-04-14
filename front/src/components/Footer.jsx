import {NavLink} from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="footer-button-container">
        <p className="text-footer-button">Une aide ? Un conseil ?</p>
        <NavLink to="/contact">
          <button className="footer-button">Contactez-nous !</button>
        </NavLink>
      </div>
      <div className="legal-notice-container">
        <p className="legal-notice-text">2023 - Fureneshi</p>
      </div>
    </div>
  );
};

export default Footer;
