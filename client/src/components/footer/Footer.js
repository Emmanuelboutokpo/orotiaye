import React from "react";
import { Link} from "react-router-dom";
import "./footer.css"

const Footer = () => {
  return (
    <footer className="container footer">
       <div className="log">
          <Link to="/" className="oro">
             ORO TI AYE
          </Link>
        </div>
      {/*   <div className="info">
          <Link>Politique De Confidentialité</Link>
          <Link className="cooki"> Politique De Cookies    </Link>
        </div> */}
        <p className="copyR">Copyright©2022 ORO TI AYE | Tous Droits Réservés</p> 
    </footer>
  );
};

export default Footer;
