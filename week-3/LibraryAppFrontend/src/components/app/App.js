import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Books from "../books/Books"
import Authors from "../authors/Authors"
import Login from '../login/Login';
import Home from '../Home';
import { tokenIsExpired, getAccessToken } from '../../services/AuthService/Auth';


const App = () => {
    const [token, setToken] = useState(getAccessToken());
    
    if (!token) {
        return <Login setToken={setToken} />
    }
    
    else if (tokenIsExpired()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiration");
        setToken(null);
        return <Login setToken={setToken} />
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiration");
        setToken(null);
        window.location.href = "/";
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <div className="navBar">
                    <Link to="/">Home</Link>  <Link to="/books">Books</Link>  <Link to="/authors">Authors</Link>    
                    <div style={{display: 'inline-block', textAlign:'end'}}>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/authors" element={<Authors />} />
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
