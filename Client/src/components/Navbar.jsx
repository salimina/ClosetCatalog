import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  function getLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <p className="navbar-subtitle">
          <span>Digital</span>
          <span>Wardrobe</span>
        </p>

        <h1 className="navbar-title">Cataloged</h1>
      </div>

      <nav className="navbar-links" aria-label="Main navigation">
        <NavLink to="/" className={getLinkClass}>
          My Closet
        </NavLink>

        <NavLink to="/wishlist" className={getLinkClass}>
          Wishlist
        </NavLink>

        <NavLink to="/swipe" className={getLinkClass}>
          Swipe
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
