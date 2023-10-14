import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Handle User Login here
    }

    return (
        <div className="auth-form">
            <h1>Login</h1>
            <form>
                <input
                    type="email"
                    value={email}
                    placeholder="user@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="user123"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            <div className="links">
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                <p>
                    Forgot your password? <Link to="/forgotpass">Reset</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
