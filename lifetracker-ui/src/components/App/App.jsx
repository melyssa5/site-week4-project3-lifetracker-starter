import { BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage"
import LoginPage from "../../pages/LoginPage/LoginPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
