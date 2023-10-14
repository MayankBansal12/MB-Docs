import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        // Logic for User signup here
    }

    return (
        <div className="auth-form">
            <h1>Sign Up</h1>
            <form>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password for it. Make it strong dude!"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleSignup}>Sign Up</button>
            </form>
            <p>
                Already a user? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Signup;
