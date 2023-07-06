import "./RegistrationForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/apiClient";

export default function RegistrationForm({ setAppState, setLoggedIn }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
   
    if (form.email.indexOf("@") === -1) {
      setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, email: null }));
    }
    

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({
         ...e,
        passwordConfirm: "Passwords do not match.",
        }));
        setIsLoading(false);
        return;
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }));
        }

    try {
      let registrationData = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      };

      let res = await apiClient.registerUser(registrationData);


      if (res?.data?.user) {
        console.log("you successfully registered");
        setAppState(res.data);
        setLoggedIn(true);
        setIsLoading(false);
        navigate("/activity");
      } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with registration" }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }));
      setIsLoading(false);
    }
  }



  return (
    <div className="registration-form">

        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />
      <form>
        <div className="input-boxes">
          <div className="email-div">
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={form.email}
              required
            />
             {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="username-div">
            <input
              className="form-input"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleInputChange}
              value={form.username}
              required
            />
          </div>

          <div className="names-div">
            <div className="first-name">
              <input
                className="form-input"
                name="firstName"
                placeholder="First name"
                onChange={handleInputChange}
                value={form.firstName}
                required
              />
            </div>
            <div className="last-name">
              <input
                className="form-input"
                name="lastName"
                placeholder="Last name"
                onChange={handleInputChange}
                value={form.lastName}
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
              value={form.password}
              required
            />
          </div>

          <div className="confirm-password-div">
            <input
              className="form-input"
              name="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              onChange={handleInputChange}
              value={form.passwordConfirm}
              required
            />
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div>
          <button
            type="submit"
            className="submit-registration"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
      </form>
      </div>
  )
}
