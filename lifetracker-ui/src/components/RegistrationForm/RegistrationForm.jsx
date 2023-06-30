import "./RegistrationForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegistrationForm() {
    
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault()
    console.log(form)

    try{
      let res = await axios.post("http://localhost:3001/auth/register", {
        firstName: form.firstname,
        lastName: form.lastname,
        username: form.username,
        email: form.email,
        password: form.password,
      })

      if (res?.data?.user) {
        console.log("yayayay")

      }


    } catch (error){}


  }



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
                name="firstname"
                placeholder="First name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="last-name">
              <input
                className="form-input"
                name="lastname"
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
          <button type="submit" className="submit-registration" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
