export default function RegistrationForm(){


    return(

        <div className="registration-form">
            <form>
                <div className="input-boxes">
                    <div className="email-div">
                        <input className="form-input" name="email" type="email" placeholder="Email"/>

                    </div>

                    <div className="username-div">
                        <input className="form-input" name="username" type="text" placeholder="Username"/>
                    </div>

                    <div className="names-div">
                        <div className="first-name">
                            <input className="form-input" name="first-name" placeholder="First name" />

                        </div>
                        <div className="last-name">
                            <input className="form-input" name="last-name" placeholder="Last name" />
                        </div>
                    </div>

                    <div className="password-div">
                        <input className="form-input" name="password" type="password" placeholder="Password"/>
                    </div>

                    <div className="confirm-password-div">
                        <input className="form-input" name="passwordConfirm" type="password" placeholder="Confirm password" />

                    </div>
                    <button type="submit" className="submit-registration">Create Account</button>
                </div>
            </form>
        </div>
    )
}