import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <div className="nav-labels"></div>
      <div className="nav-signin">
        <Link to="/login">
          <button className="btn ghost" type="button">Sign In</button>
        </Link>

        <Link to="/register">
              <button className="btn primary" type="button">Register</button>
        </Link>
      </div>
    </nav>
  );
}
