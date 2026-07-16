import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

        navigate("/dashboard");

    }

}, [navigate]);
    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            console.log("Email:", email);
            console.log("Password:", password);

           const data = await loginUser(email, password);

console.log("Login Response:", data);

try {
    localStorage.setItem("token", data.access_token);
    console.log("Token stored");
} catch (e) {
    console.error("Storage Error:", e);
}

console.log("Redirecting...");

window.location.href = "/dashboard";

        }

        catch (err) {
    console.error(err);
    setError(err.message);
}

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <form
                className="login-card"
                onSubmit={handleLogin}
            >

                <h1 className="login-title">
                    ELAMS
                </h1>

                <p className="login-subtitle">
                    Employee Leave & Attendance
                    <br />
                    Management System
                </p>

                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                {

                    error &&

                    <p
                        style={{
                            color: "#ffdddd",
                            marginBottom: "15px",
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </p>

                }

                <button
                    className="login-button"
                    type="submit"
                    disabled={loading}
                >

                    {

                        loading
                            ? "Logging in..."
                            : "Login"

                    }

                </button>

            </form>

        </div>

    );

}

export default Login;