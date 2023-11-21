import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPass = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        // Reset password logic here
    };

    return (
        <div className="auth-form">
            <div className="form-heading">
                <h1>Forgot Password?</h1>
                <p>Enter your email below and look out for the instructions on your email!</p>
            </div>
            <form>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="button" onClick={handleResetPassword} disabled>Send!</button>
            </form>
            <p>
                Retry Login Again? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default ResetPass;