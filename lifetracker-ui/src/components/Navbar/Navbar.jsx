import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({loggedIn, setLoggedIn, setAppState}) {
  const navigate = useNavigate();


  const handleLogoutUser = () => {    
    setLoggedIn(false);
    setAppState({});
    localStorage.removeItem('token');
    navigate("/");
  }





  return (
    <nav className="Navbar">
        <div className="nav-pages">
          <Link to="/">
            <img src="https://lifetracker-ui-ai8e.onrender.com/assets/codepath-f1b3e41a.svg"/>
          </Link>
          <Link to="/activity"> Activity </Link>
          <Link to="/exercise"> Exercise </Link>
          <Link to="/nutrition"> Nutrition </Link>
          <Link to="/sleep"> Sleep </Link>

        </div>
        {!loggedIn? (
        <div className="nav-pages">
        <Link to="/login">
          <button className="btn ghost" type="button">Sign In</button>
        </Link>

        <Link to="/register">
              <button className="btn primary" type="button">Register</button>
        </Link> </div>) : (
          <div className="nav-pages">
        <button onClick={()=>{handleLogoutUser()}}>Sign Out</button>
        </div>)}
    
    </nav>
  );
}
