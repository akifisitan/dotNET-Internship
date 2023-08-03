import React, { useState } from 'react';
import './Login.css';
import loginUser from "../../services/LoginService/LoginService.js"



const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [infoMessage, setInfo] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        if (username === undefined || password === undefined) {
            setInfo("Username and password cannot be empty");
            return;
        }
        const response = await loginUser(username, password);
        if (response.data !== null) {
            setToken(response.data.token);
        }
        else {
            setInfo(`An error occurred: ${response.error}`);
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" required minLength={1} onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" required minLength={8} maxLength={16} onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                <br/>
                    <button type="submit">Submit</button>
                </div>
                <p>{infoMessage !== null ? infoMessage : null}</p>
            </form>
        </div>
    )
}

export default Login;