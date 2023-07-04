import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({user, loggedIn}) {
  return (
    <nav className="Navbar">
      <div className="nav-labels"></div>
      <div className="nav-signin">
        {!loggedIn? (
        <div>
        <Link to="/login">
          <button className="btn ghost" type="button">Sign In</button>
        </Link>

        <Link to="/register">
              <button className="btn primary" type="button">Register</button>
        </Link> </div>) : (<button>Sign Out</button>)}
      </div>
    </nav>
  );
}
