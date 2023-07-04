import LoginForm from "../../components/LoginForm/LoginForm"

export default function LoginPage({setAppState}){
    return (
        <div className="login-page">
            <h1> loginnnn </h1>
            <LoginForm setAppState={setAppState}/>
        </div>
    )
}