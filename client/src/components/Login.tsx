import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../utils/notification";
const backend = import.meta.env.VITE_SERVER;

const Login = () => {
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    // Navigate to home page if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])

    // Handle login for the user
    const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const input = {
            email, passwd
        }
        try {
            const response = await axios.post(backend + "/user/login", input);
            if (response.status === 200) {
                notify("Login Successful!", "success");
                const token = response.data.token
                if (token) {
                    localStorage.setItem("token", token)
                    navigate("/");
                }
            }
        } catch (error: any) {
            notify(error?.response?.data?.msg || "Incorrect email or password!", "error");
        }
    }

    return (
        <div className="auth-form">
            <div className="form-heading">
                <h1>Login</h1>
                <p>Login to your account to view, edit or add new documents!</p>
            </div>
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
                    value={passwd}
                    required
                    placeholder="Enter your password. Eg:- user123"
                    onChange={(e) => setPasswd(e.target.value)}
                />
                {passwd && <div onClick={() => setShow(!show)} className="info-btn">Click to {show ? "hide" : "view"} password</div>}
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
