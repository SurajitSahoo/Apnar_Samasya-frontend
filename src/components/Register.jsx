import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from './../api/api';

const Register = () => {

    const navigate = useNavigate();

    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Register Data:", register);

        try {

            const response = await axios.post(
                `${baseURL}/api/auth/registernormaluser`,
                register
            );

            console.log("Register response:", response.data);

            alert("Registration successful!");

            // Go to login page
            navigate("/");

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

                alert(
                    error.response.data ||
                    "Registration failed"
                );
            } else {
                alert("Unable to connect to server");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">
                    Register Here
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block font-semibold text-gray-700"
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={register.username}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block font-semibold text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={register.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>


                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block font-semibold text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={register.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>


                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
                    >
                        Register
                    </button>

                </form>

                {/* Login */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="font-semibold text-green-600 hover:underline"
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
};

export default Register;