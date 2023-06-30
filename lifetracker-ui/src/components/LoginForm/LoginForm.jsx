import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, user);
      if (res?.data) {
        console.log("you successfully loggied in")
      } 
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <div className="login-form">
      <div className="input-div">
        <form>
          <div>
            <div className="email-input">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="password-input">
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <button onClick={handleOnSubmit}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}