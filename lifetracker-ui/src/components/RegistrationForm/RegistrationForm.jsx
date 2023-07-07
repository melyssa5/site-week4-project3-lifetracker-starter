import React from "react";
import { useState } from "react";
import "./RegistrationForm.css";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";  

const RegistrationForm = ({ isUserLoggedIn, registrationError, setUser, setIsUserLoggedIn, setRegistrationError }) => {

    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: "",
    }); 

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleUserRegistration(userFormData);
        if (isUserLoggedIn) {
            setUserFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                username: "",
            });
        }
    }

    const handleUserRegistration = async (userInfo) => {
        const response = await ApiClient.registerUser(userInfo);

        if (response.data?.user) {
            setIsUserLoggedIn(true);
            setUser(response.data.user);
            ApiClient.setToken(response.data.token);
            setRegistrationError(null);
            navigate("/activity");
        } else {
            setRegistrationError(response);
            console.log("registrationError:", response)
        }
    };



    return (
        <div className="registration-page">
        <div className="registration-form">
            <span className="chakra-avatar css-3fy9wq">
          <img
            src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
            className="user-profile-img"
          ></img>
        </span>
        <h2 className="chakra-heading css-3q8efk">Create an Account</h2>

            <form onSubmit={handleFormSubmit}>
                <div className="form-container">
                <label htmlFor="name">First Name</label>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userFormData.firstName}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userFormData.lastName}
                    onChange={handleInputChange}
                />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userFormData.username}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                />
                <button type="submit" className="submit-login">Register</button>
                </div>
            </form>

            {registrationError && <p>{registrationError}</p>}
        </div>
        </div>
    );
};

export default RegistrationForm;