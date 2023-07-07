import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isUserLoggedIn, setUser, setIsUserLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    setIsUserLoggedIn(false);
    setUser({});
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className="navbar">
        <div className="css-70qvj9">
          <Link className="logo" to={"/"}>
            <img
              src="https://lifetracker.up.railway.app/assets/codepath-f1b3e41a.svg"
              alt="logo"
            ></img>
          </Link>
          <Link className="chakra-link css-74uit1" to={"/activity"}>
            Activity
          </Link>
          <Link className="chakra-link css-74uit1" to={"/exercise"}>
            Exercise
          </Link>
          <Link className="chakra-link css-74uit1" to={"/nutrition"}>
            Nutrition
          </Link>
          <Link className="chakra-link css-74uit1" to={"/sleep"}>
            Sleep
          </Link>
        </div>
        <div className="css-70qvj9">
          {!isUserLoggedIn ? (
            <>
            <Link to={"/login"} className="login-button">
              <button type="button" className="chakra-button css-1t9i4zo">
                
                  Sign In
             
              </button>   </Link>

              <Link to={"/register"} className="register-button">
              <button type="button" className="chakra-button css-td8gbm">
                
                  Register
                
              </button></Link>
            </>
          ) : (
            <Link to={"/"} className="logout-button">
            <button
              type="button"
              className="css-td8gbm"
              onClick={handleLogoutUser}
            >
              
                Log Out
              
            </button></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
