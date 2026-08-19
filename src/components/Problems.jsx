import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import baseURL from './../api/api';

const Problems = ({ limit }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search
    const [place, setPlace] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searched, setSearched] = useState(false);

    const navigate = useNavigate();

    const cookies = new Cookies();

    // =====================================================
    // Fetch ALL problems
    // =====================================================
    const fetchProblems = async () => {
        const token = cookies.get("token");

        console.log("TOKEN:", token);

        if (!token) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${baseURL}/api/allproblems`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("All Problems:", response.data);

            if (Array.isArray(response.data)) {
                setProblems(response.data);
            } else {
                setError("Invalid data received from server.");
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response?.status === 401) {
                navigate("/");
            } else if (error.response?.status === 403) {
                setError("You don't have permission.");
            } else {
                setError("Failed to load problems.");
            }
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // Search problems by PLACE
    // =====================================================
    const searchByPlace = async () => {
        const token = cookies.get("token");

        if (!token) {
            setError("Please login first.");
            return;
        }

        // If search box is empty, show all problems again
        if (!place.trim()) {
            setSearched(false);
            setError("");
            fetchProblems();
            return;
        }

        try {
            setIsSearching(true);
            setError("");
            setSearched(true);

            const response = await axios.get(
                `${baseURL}/api/getbyplace`,
                {
                    params: {
                        place: place.trim(),
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Problems by place:", response.data);

            if (Array.isArray(response.data)) {
                setProblems(response.data);
            } else {
                setProblems([]);
                setError("Invalid data received from server.");
            }
        } catch (error) {
            console.error("Search error:", error);

            if (error.response?.status === 401) {
                navigate("/");
            } else if (error.response?.status === 403) {
                setError("You don't have permission.");
            } else {
                setProblems([]);
                setError("Failed to search problems.");
            }
        } finally {
            setIsSearching(false);
        }
    };

    // =====================================================
    // Search when ENTER is pressed
    // =====================================================
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchByPlace();
        }
    };
    const handleCardClick = (id) => {
    navigate(`/problem/${id}`);
};
    // =====================================================
    // Clear Search
    // =====================================================
    const clearSearch = () => {
        setPlace("");
        setSearched(false);
        setError("");
        fetchProblems();
    };

    // =====================================================
    // Edit problem
    // =====================================================
    

    // =====================================================
    // Initial fetch
    // =====================================================
    useEffect(() => {
        fetchProblems();
    }, []);

    // =====================================================
    // Loading
    // =====================================================
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black ">
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
        );
    }

    // =====================================================
    // Limit
    // =====================================================
    const displayedProblems = limit
        ? problems.slice(0, limit)
        : problems;

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <motion.div
                
                viewport={{ once: false, amount: 0.2 }}
                className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] px-6 py-20 bg-black"
            >

                {/* =====================================================
                    HEADING
                ===================================================== */}
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: -30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mb-8 text-center text-4xl font-bold text-white"
                >
                    Problems
                </motion.h1>


                {/* =====================================================
                    SEARCH BAR
                ===================================================== */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                    }}
                    className="mx-auto mb-12 max-w-3xl "
                >

                    <div className="flex flex-col gap-3 sm:flex-row">

                        {/* Input */}
                        <input
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search problems by place..."
                            className="flex-1 rounded-xl border border-gray-600 bg-gray-800 px-5 py-4 text-white outline-none transition duration-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Search Button */}
                        <button
                            type="button"
                            onClick={searchByPlace}
                            disabled={isSearching}
                            className="rounded-xl bg-purple-700 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSearching ? "Searching..." : "Search"}
                        </button>

                        {/* Clear Button */}
                        {searched && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="rounded-xl bg-gray-700 px-6 py-4 font-semibold text-white transition duration-300 hover:bg-gray-600"
                            >
                                Clear
                            </button>
                        )}

                    </div>

                    {/* Search information */}
                    {searched && !isSearching && (
                        <p className="mt-4 text-center text-gray-400">
                            Showing problems for:
                            <span className="ml-1 font-semibold text-purple-400">
                                {place}
                            </span>
                        </p>
                    )}

                </motion.div>


                {/* =====================================================
                    ERROR
                ===================================================== */}
                {error && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        className="mx-auto mb-8 max-w-xl rounded-lg bg-red-100 p-4 text-center text-red-700"
                    >
                        {error}
                    </motion.div>
                )}


                {/* =====================================================
                    SEARCHING
                ===================================================== */}
                {isSearching && (
                    <div className="flex items-center justify-center py-10">

                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="h-10 w-10 rounded-full border-4 border-gray-500 border-t-purple-500"
                        />

                    </div>
                )}


                {/* =====================================================
                    PROBLEM CARDS
                ===================================================== */}
                {!isSearching && displayedProblems.length > 0 ? (

                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">

                        {displayedProblems.map((problem, index) => (

                            <motion.div
    key={problem.id}
    initial={{
        opacity: 0,
        y: 50,
    }}
    animate={{
        opacity: 1,
        y: 0,
    }}
    transition={{
        duration: 0.5,
        delay: index * 0.1,
    }}
    whileHover={{
        y: -10,
        scale: 1.02,
    }}
    onClick={() => handleCardClick(problem.id)}
    className="cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
>

                                {/* =====================================================
                                    IMAGE
                                ===================================================== */}
                                <div className="h-56 w-full overflow-hidden bg-gray-200">

                                    {problem.imageData ? (
                                        <motion.img
                                            src={`data:${problem.imageType};base64,${problem.imageData}`}
                                            alt={problem.name}
                                            whileHover={{
                                                scale: 1.1,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                            }}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gray-700">
                                            <span className="text-gray-400">
                                                No Image
                                            </span>
                                        </div>
                                    )}

                                </div>


                                {/* =====================================================
                                    CARD CONTENT
                                ===================================================== */}
                                <div className="p-6">

                                    {/* NAME */}
                                    <h2 className="mb-2 text-2xl font-bold text-gray-300">
                                        {problem.name}
                                    </h2>


                                    {/* PLACE */}
                                    <p className="mb-5 text-sm text-gray-400">
                                        📍 {problem.place}
                                    </p>


                                    {/* DESCRIPTION */}
                                    <div className="mb-4">

                                        <h3 className="font-semibold text-gray-300">
                                            Description
                                        </h3>

                                        <p className="mt-1 text-gray-400">
                                            {problem.description}
                                        </p>

                                    </div>


                                    {/* CONDITION */}
                                    <div className="mb-4">

                                        <h3 className="font-semibold text-gray-300">
                                            Condition
                                        </h3>

                                        <p className="mt-1 text-gray-400">
                                            {problem.conditions}
                                        </p>

                                    </div>


                                    {/* EXPECTATION */}
                                    <div className="mb-6">

                                        <h3 className="font-semibold text-gray-300">
                                            Expectation
                                        </h3>

                                        <p className="mt-1 text-gray-400">
                                            {problem.expectation}
                                        </p>

                                    </div>



                                </div>

                            </motion.div>

                        ))}

                    </div>

                ) : (

                    !error &&
                    !isSearching && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            className="flex min-h-[300px] items-center justify-center"
                        >
                            <p className="text-xl text-gray-500">
                                {searched
                                    ? `No problems found for "${place}".`
                                    : "No problems found."}
                            </p>
                        </motion.div>
                    )

                )}

            </motion.div>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Problems;