import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"

export default function RegistrationPage({setAppState, setLoggedIn}){
    return(
        <div className="registration-page">
            <div className="form-container">
                <RegistrationForm setAppState={setAppState} setLoggedIn={setLoggedIn} />
            </div>
        </div>
    )
}