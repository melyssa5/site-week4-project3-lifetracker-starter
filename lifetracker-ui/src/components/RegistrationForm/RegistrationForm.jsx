import "./RegistrationForm.css";
import { useState } from "react";

export default function RegistrationForm() {
    
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="registration-form">
      <form>
        <div className="input-boxes">
          <div className="email-div">
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="username-div">
            <input
              className="form-input"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="names-div">
            <div className="first-name">
              <input
                className="form-input"
                name="first-name"
                placeholder="First name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="last-name">
              <input
                className="form-input"
                name="last-name"
                placeholder="Last name"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="password-div">
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="confirm-password-div">
            <input
              className="form-input"
              name="passwordConfirm"
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <button type="submit" className="submit-registration">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
