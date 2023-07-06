import { BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage"
import LoginPage from "../../pages/LoginPage/LoginPage";
import ExercisePage from "../../pages/ExercisePage/ExercisePage"
import ActivityPage from "../../pages/ActivityPage/ActivityPage"
import NutritionPage from "../../pages/NutritionPage/NutritionPage";
import SleepPage from "../../pages/SleepPage/SleepPage";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import jwtDecode from "jwt-decode";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [appState, setAppState] = useState({});


  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const {data, error} = await apiClient.fetchUserFromToken();
      if (data) {
        setLoggedIn(true);
        setAppState((prevState) => ({
          ...prevState,
          user: data.user,
        }));
      }
    };

    const token = localStorage.getItem('token');
    console.log("token", token)
    if (token) {
      apiClient.setToken(token);
      checkIfUserIsLoggedIn();
    }
  }, []); 



  return (
    <div className="App">
      <BrowserRouter>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAppState={setAppState}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<RegistrationPage setAppState={setAppState} setLoggedIn={setLoggedIn} />}/>
        <Route path="/login" element={<LoginPage setAppState={setAppState} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/exercise" element={<ExercisePage />}/>
        <Route path="/nutrition" element={<NutritionPage />}/>
        <Route path="/sleep" element={<SleepPage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
