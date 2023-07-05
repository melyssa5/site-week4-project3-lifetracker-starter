import { BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage"
import LoginPage from "../../pages/LoginPage/LoginPage";
import ActivityPage from "../../pages/ActivityPage/ActivityPage"
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [appState, setAppState] = useState({});
 
  
  useEffect(() => {
    const checkLoggedIn = () => {
      // check if the user is logged in when the user first accesses the webapp
      const token = localStorage.getItem("token");
      if (token) {
        // decode the stored token
        const decodedToken = jwtDecode(token);
        setAppState({ username: decodedToken.userName });

        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          // token has expired so log out the user
          handleLogout();
        }
      }
    };
    checkLoggedIn();
  }, []);


  // function that handles logging out
  function handleLogout(){
    localStorage.removeItem("token");
    setLoggedIn(false);
  };


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar user={appState.userLogin} loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<RegistrationPage setAppState={setAppState} setLoggedIn={setLoggedIn} />}/>
        <Route path="/login" element={<LoginPage setAppState={setAppState} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/activity" element= {<ActivityPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
