import { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        // Logic for User signup here
        e.preventDefault();
        const details = {
            email, password, name
        }
        console.log(details);
    }

    return (
        <div className="auth-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter your Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password for it. Make it strong dude!"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                {confirm === password ? <button type="submit">Sign Up</button> : <p className="error-message">Please confirm your password before signing up</p>}
            </form>
            <p>
                Already a user? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Signup;
