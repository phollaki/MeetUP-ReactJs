import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <nav className="navbar header">
      <div className="container-fluid">
        <h1 className="navbar-brand">
          Meet <span className="header__up">UP</span>
        </h1>
        <NavLink to="/" className="btn btn-recommendation">
          Recommendations
        </NavLink>
        <NavLink to="/register" className="btn btn-register" type="submit">
          Registration
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
