import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function LoginForm({setAppState, setLoggedIn}) {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, user);
      if (res?.data) {
        console.log("you successfully logged in :)");
        setAppState((data) => ({
          ...data, user: res.data.userLogin
        }));
        setIsLoading(false);
        setLoggedIn(true);
        navigate("/activity")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({...e,form: message ? String(message) : String(err)}));
      setIsLoading(false);
    }
  }


  return (
    <div className="login-form">
      <div className="input-div">
      {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <form>
          <div>
            <div className="email-input">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                className="form-input"
                value={user.email}
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
                value={user.password}
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
