import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">Closet Catalog</h2>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          My Closet
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Wishlist
        </NavLink>

        <NavLink
          to="/swipe"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Swipe
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
