import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div className="auth-form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    required
                    placeholder="Enter Email. Eg:- user@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={show ? "text" : "password"}
                    value={password}
                    required
                    placeholder="Enter your password. Eg:- user123"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {password && <div onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>Click to {show ? "hide" : "view"} password</div>}
                <button type="submit">Login</button>
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
