import { useEffect, useState } from "react";
import AuthService from "../api.auth";
import Store from '../store';
import { Link, Navigate, redirect } from "react-router-dom";
import store from "../store";

const RegisterPage = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        if (!uname.value.endsWith('.msu.ru') && !uname.value.endsWith('@msu.ru') )
            return setErrorMessages({name: 'msu', message: 'Пожалуйста введите почту на домене msu.ru.'})

       await Store.register(uname.value, pass.value)
        
        if (Store.authError != "") {
            setErrorMessages({name: 'pass', message: Store.authError})
        }
        else{
            setIsSubmitted(true)
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
                    {renderErrorMessage("msu")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    const renderMessage = (
        <div>
            <div>User is successfully created. Please verify your email.</div>
            <Link to="/">Home</Link>
        </div>
    );

    
    if (store.user)
        return (<Navigate to={"/"}/>)

    return (<div className="app">
        <div className="login-form">
            <div className="title">Register</div>
            {isSubmitted ? renderMessage : renderForm}
        </div>
    </div>)
};

export default RegisterPage