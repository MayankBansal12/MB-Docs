import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notify } from '../utils/notification';
const backend = import.meta.env.VITE_SERVER;

const ResetPass = () => {
    const location = useLocation();
    const userToken = new URLSearchParams(location.search).get("token");
    const [passwd, setPasswd] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    // If the token already exists, then navigate to home page
    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        }
    }, [])

    // Handle Password reset 
    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitted(true);
        e.preventDefault();
        try {
            await axios.put(backend + "/user/reset", { passwd, userToken });
            notify("Password Changed!", "success");
            navigate("/login");
        } catch (error: any) {
            setSubmitted(false);
            notify(error?.response?.data?.msg || "Error while changing password, try again!", "error");
        }
    }

    return (
        <div className="auth-form">
            <div className="form-heading">
                <h1>Reset Password</h1>
                <p>Change your account's password. Don't forget this time though.</p>
            </div>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    value={passwd}
                    placeholder="Account Password. Make it strong dude!"
                    required
                    onChange={(e) => setPasswd(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm your Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                {confirm === passwd ? <button type="submit" disabled={submitted}>Update</button> : <p className="error-message">Please confirm your password before changing.</p>}
            </form>
        </div>
    );
};

export default ResetPass;