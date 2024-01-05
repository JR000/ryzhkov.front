import { useEffect, useState } from "react";
import AuthService from "../api.auth";
import Store from '../store';
import { Navigate, redirect } from "react-router-dom";
import store from "../store";

const LoginPage = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

        // User Login info

    useEffect(() => {
        if (store.user)
            redirect('/')
    }, [])

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];
       await Store.login(uname.value, pass.value)
       
        if (Store.authError != "") {
            setErrorMessages({name: 'pass', message: Store.authError})
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    if (store.user)
        return (<Navigate to={"/"}/>)

    return (<div className="app">
        <div className="login-form">
            <div className="title">Login</div>
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
    </div>)
};

export default LoginPage