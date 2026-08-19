import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import baseURL from './../api/api';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post(
                `${baseURL}/api/auth/login`,
                data
            );

            console.log("Login response:", response.data);

            // IMPORTANT: backend returns jwtToken, not token
            const token = response.data.jwtToken;

            if (!token) {
                console.error("Token not received from backend");
                return;
            }

            // Store JWT in cookie
            cookies.set("token", token, {
                path: "/",
            });
            localStorage.setItem("username", username);
            console.log("Login successful");
            console.log("JWT:", token);

            navigate("/home");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

            alert("Invalid username or password");
        }
    };

    const redirectToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">
                    Login Here
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={redirectToRegister}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Register
                        </button>
                    </p>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
                    >
                        Log in
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;