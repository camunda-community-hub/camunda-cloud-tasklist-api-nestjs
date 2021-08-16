import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar is-dark has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink exact to="/" className="navbar-item">
          <img src="/src/favicon.png" />
        </NavLink>
      </div>
    </nav>
  );
}

export { NavBar };
