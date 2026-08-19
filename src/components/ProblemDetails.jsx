import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import baseURL from './../api/api';

const ProblemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const cookies = new Cookies();

    useEffect(() => {
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        const token = cookies.get("token");

        if (!token) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${baseURL}/api/getproblem/${id}`,
                {
                     params: {
            id: id
        },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Problem Details:", response.data);

            setProblem(response.data);
        } catch (error) {
            console.error("Error:", error);

            if (error.response?.status === 401) {
                navigate("/");
            } else if (error.response?.status === 403) {
                setError("You don't have permission.");
            } else if (error.response?.status === 404) {
                setError("Problem not found.");
            } else {
                setError("Failed to load problem.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${problem.id}`);
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-screen items-center justify-center bg-black">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-purple-600"
                    />
                </div>

                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-screen items-center justify-center bg-black px-6">
                    <div className="text-center">
                        <p className="mb-6 text-xl text-red-400">
                            {error}
                        </p>

                        <button
                            onClick={() => navigate("/problems")}
                            className="rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-500"
                        >
                            Back to Problems
                        </button>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    if (!problem) {
        return null;
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] px-6 py-16">

                {/* Main Container */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mx-auto max-w-7xl"
                >

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 rounded-lg bg-gray-700 px-5 py-3 font-medium text-white transition hover:bg-gray-600"
                    >
                        ← Back
                    </button>

                    {/* Details Card */}
                    <div className="overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">

                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* =====================================================
                                LEFT SIDE - BIG IMAGE
                            ===================================================== */}
                            <div className="flex min-h-[500px] items-center justify-center bg-black lg:min-h-[700px]">

                                {problem.imageData ? (
                                    <motion.img
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                        }}
                                        src={`data:${problem.imageType};base64,${problem.imageData}`}
                                        alt={problem.name}
                                        className="h-full max-h-[700px] w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex h-[500px] w-full items-center justify-center bg-gray-800 lg:h-[700px]">
                                        <span className="text-xl text-gray-500">
                                            No Image Available
                                        </span>
                                    </div>
                                )}

                            </div>


                            {/* =====================================================
                                RIGHT SIDE - INFORMATION
                            ===================================================== */}
                            <div className="p-8 lg:p-12">

                                {/* Name */}
                                <motion.h1
                                    initial={{
                                        opacity: 0,
                                        x: 30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                    className="mb-4 text-4xl font-bold text-white"
                                >
                                    {problem.name}
                                </motion.h1>


                                {/* Place */}
                                <div className="mb-8">
                                    <p className="text-lg text-purple-400">
                                        📍 {problem.place}
                                    </p>
                                </div>


                                {/* Divider */}
                                <div className="mb-8 h-px bg-gray-700" />


                                {/* Description */}
                                <div className="mb-8">
                                    <h2 className="mb-3 text-2xl font-semibold text-white">
                                        Description
                                    </h2>

                                    <p className="text-base leading-7 text-gray-400">
                                        {problem.description || "No description available."}
                                    </p>
                                </div>


                                {/* Condition */}
                                <div className="mb-8">
                                    <h2 className="mb-3 text-2xl font-semibold text-white">
                                        Condition
                                    </h2>

                                    <p className="text-base leading-7 text-gray-400">
                                        {problem.conditions || "No condition information available."}
                                    </p>
                                </div>


                                {/* Expectation */}
                                <div className="mb-8">
                                    <h2 className="mb-3 text-2xl font-semibold text-white">
                                        Expectation
                                    </h2>

                                    <p className="text-base leading-7 text-gray-400">
                                        {problem.expectation || "No expectation information available."}
                                    </p>
                                </div>


                                {/* ID */}
                                <div className="mb-8">
                                    <h2 className="mb-3 text-lg font-semibold text-gray-300">
                                        Problem ID
                                    </h2>

                                    <span className="rounded-lg bg-gray-800 px-4 py-2 text-purple-400">
                                        #{problem.id}
                                    </span>
                                </div>


                                {/* Buttons */}
                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                                    {/* Edit */}
                                    <button
                                        onClick={handleEdit}
                                        className="flex-1 rounded-xl bg-green-800 px-6 py-4 font-semibold text-white transition duration-300 hover:bg-green-500"
                                    >
                                        Edit Problem
                                    </button>

                                    {/* Back */}
                                    <button
                                        onClick={() => navigate("/problems")}
                                        className="flex-1 rounded-xl bg-purple-700 px-6 py-4 font-semibold text-white transition duration-300 hover:bg-purple-500"
                                    >
                                        All Problems
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>

            <Footer />
        </>
    );
};

export default ProblemDetails;