import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notify } from '../utils/notification';
const backend = import.meta.env.VITE_SERVER;

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    // Navigate to home page if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])

    // Send reset password request to server
    const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitted(true);
        e.preventDefault();
        try {
            const res = await axios.post(backend + "/user/forgotpass", { email });
            if (res.status === 200) {
                notify("Email Sent!", "success")
            }
            setSubmitted(false)
        } catch (error: any) {
            setSubmitted(false)
            notify(error?.response?.data?.msg || "Some Error occured, try again!", "error");
        }
    };

    return (
        <div className="auth-form">
            <div className="form-heading">
                <h1>Forgot Password?</h1>
                <p>Enter your email below and look out for the instructions on your email!</p>
            </div>
            <form onSubmit={sendRequest}>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitted}>Send!</button>
            </form>
            <p>
                Retry Login Again? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default ForgotPass;