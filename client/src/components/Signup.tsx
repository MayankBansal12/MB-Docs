import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { notify } from '../utils/notification';
const backend = import.meta.env.VITE_SERVER;

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    // If the token already exists, then navigate to home page
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])

    // Handle signup for the user
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        // Logic for User signup here
        e.preventDefault();
        const input = {
            email, passwd, name
        }
        try {
            await axios.post(backend + "/user/signup", input);
            notify("User Signup Successful!", "success");
            navigate("/login");
        } catch (error: any) {
            notify(error?.response?.data?.msg || "Error while signing up, try again!", "error");
        }
    }

    return (
        <div className="auth-form">
            <div className="form-heading">
                <h1>Signup</h1>
                <p>Signup and Setup your account now and start creating documents.</p>
            </div>
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
                    value={passwd}
                    placeholder="Password for it. Make it strong dude!"
                    required
                    onChange={(e) => setPasswd(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                {confirm === passwd ? <button type="submit">Sign Up</button> : <p className="error-message">Please confirm your password before signing up</p>}
            </form>
            <p>
                Already a user? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Signup;
