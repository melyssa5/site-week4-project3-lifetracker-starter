import "./LoginForm.css"
import { useState } from "react"

export default function LoginForm(){
    const [user, setUser] = useState({email: "", password: ""})

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };


    return(
        <div className="login-form">
            <div className="input-div">
                <form>
                    <div>
                        <div className="email-input">
                            <input name="email" type="email" placeholder="Email" className="form-input" required />
                        </div>
                        <div className="password-input">
                            <input name="password" type="password" placeholder="Password" className="form-input" required />
                        </div>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}