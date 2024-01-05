import { useEffect, useState } from "react";
import AuthService from "../api.auth";
import Store from '../store';
import { Link, redirect, useSearchParams } from "react-router-dom";

const EmailVerification = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();


    // User Login info

    useEffect(() => {

        const asyncFn = async () => {
            const token = searchParams.get('token')
            if (!token)
                redirect('/')

            await Store.verify_email(token)

            if (Store.authError != "") {
                redirect('/')
            }
            else {
                setIsLoading(false)
            }

        };
        asyncFn();
    }, [])


    const renderForm = (
        <div className="form">
            Your email is successfully verified!
            <Link to="/login"></Link>
        </div>
    );

    return (<div className="app">
        <div className="login-form">
            {isLoading ? <div>Loading...</div> : renderForm}
        </div>
    </div>)
};

export default EmailVerification