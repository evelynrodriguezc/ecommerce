import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/API";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await API.post("/auth/login", { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            alert("Login successful");
        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;