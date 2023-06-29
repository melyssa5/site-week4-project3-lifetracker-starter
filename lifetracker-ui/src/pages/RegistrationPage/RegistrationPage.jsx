import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"

export default function RegistrationPage(){

    // in this page you will check whether the use is logged in, if they are
    // render the activity page, if not render the registration form component
    return(
        <div className="registration-page">
            <div className="form-container">
                <RegistrationForm />
            </div>
        </div>
    )
}