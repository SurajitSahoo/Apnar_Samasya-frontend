import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";
import baseURL from './../api/api';

const Add = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const [problem, setProblem] = useState({
        name: "",
        place: "",
        description: "",
        conditions: "",
        expectation: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // After successful upload
    const [uploaded, setUploaded] = useState(false);

    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        setProblem({
            ...problem,
            [e.target.name]: e.target.value,
        });

    };


    // ==========================================
    // IMAGE CHANGE
    // ==========================================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }

    };


    // ==========================================
    // ADD PROBLEM
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = cookies.get("token");

        if (!token) {
            navigate("/");
            return;
        }

        if (!imageFile) {
            setError("Please select an image.");
            return;
        }

        setSaving(true);
        setError("");

        try {

            const formData = new FormData();

            const productBlob = new Blob(
                [JSON.stringify(problem)],
                {
                    type: "application/json",
                }
            );

            formData.append("prod", productBlob);
            formData.append("imageFile", imageFile);

            const response = await axios.post(
                `${baseURL}/api/addproblem`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Problem added:", response.data);

            alert("Problem added successfully!");

            // Show receipt button
            setUploaded(true);

        } catch (error) {

            console.error("Add problem error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

            if (error.response?.status === 401) {

                navigate("/");

            } else if (error.response?.status === 403) {

                setError(
                    "You don't have permission to add a problem."
                );

            } else {

                setError(
                    error.response?.data ||
                    "Failed to add problem."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // ==========================================
    // DOWNLOAD PDF RECEIPT
    // ==========================================

    const downloadReceipt = () => {

        // Get username from localStorage
        const username =
            localStorage.getItem("username") ||
            localStorage.getItem("userName") ||
            "User";

        const doc = new jsPDF();

        // ==========================================
        // TITLE
        // ==========================================

        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");

        doc.text(
            "Problem Submission Receipt",
            105,
            20,
            {
                align: "center",
            }
        );


        // ==========================================
        // USERNAME
        // ==========================================

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");

        doc.text(
            `Username: ${username}`,
            20,
            40
        );


        // Horizontal line

        doc.line(
            20,
            45,
            190,
            45
        );


        // ==========================================
        // PROBLEM DETAILS
        // ==========================================

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");

        doc.text(
            "Problem Details",
            20,
            60
        );


        // ==========================================
        // NAME
        // ==========================================

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");

        doc.text(
            "Problem Name:",
            20,
            75
        );

        doc.setFont("helvetica", "normal");

        doc.text(
            problem.name,
            65,
            75
        );


        // ==========================================
        // PLACE
        // ==========================================

        doc.setFont("helvetica", "bold");

        doc.text(
            "Place:",
            20,
            90
        );

        doc.setFont("helvetica", "normal");

        doc.text(
            problem.place,
            65,
            90
        );


        // ==========================================
        // DESCRIPTION
        // ==========================================

        doc.setFont("helvetica", "bold");

        doc.text(
            "Description:",
            20,
            105
        );

        doc.setFont("helvetica", "normal");

        const descriptionLines = doc.splitTextToSize(
            problem.description,
            125
        );

        doc.text(
            descriptionLines,
            20,
            115
        );


        let currentY =
            115 + descriptionLines.length * 7;


        // ==========================================
        // CONDITION
        // ==========================================

        doc.setFont("helvetica", "bold");

        doc.text(
            "Condition:",
            20,
            currentY + 5
        );

        doc.setFont("helvetica", "normal");

        const conditionLines = doc.splitTextToSize(
            problem.conditions,
            125
        );

        doc.text(
            conditionLines,
            20,
            currentY + 15
        );


        currentY =
            currentY +
            15 +
            conditionLines.length * 7;


        // ==========================================
        // EXPECTATION
        // ==========================================

        doc.setFont("helvetica", "bold");

        doc.text(
            "Expectation:",
            20,
            currentY + 5
        );

        doc.setFont("helvetica", "normal");

        const expectationLines = doc.splitTextToSize(
            problem.expectation,
            125
        );

        doc.text(
            expectationLines,
            20,
            currentY + 15
        );


        // ==========================================
        // FOOTER
        // ==========================================

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");

        doc.text(
            "Thank you for reporting this problem.",
            105,
            280,
            {
                align: "center",
            }
        );


        // ==========================================
        // DOWNLOAD
        // ==========================================

        doc.save(
            `${problem.name || "problem"}-receipt.pdf`
        );

    };


    // ==========================================
    // UI
    // ==========================================

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] px-6 py-24">

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
                        duration: 0.5,
                    }}
                    className="mx-auto max-w-2xl rounded-2xl bg-gray-800 p-8 shadow-2xl"
                >

                    {/* HEADING */}

                    <h1 className="mb-8 text-center text-3xl font-bold text-white">
                        Upload Your Problem
                    </h1>


                    {/* SUCCESS */}

                    {uploaded && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="mb-6 rounded-xl bg-green-900/50 p-5 text-center"
                        >

                            <p className="mb-4 text-lg font-semibold text-green-400">
                                Problem added successfully!
                            </p>

                            <p className="mb-5 text-sm text-gray-300">
                                Download your receipt before leaving this page.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={downloadReceipt}
                                    className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                                >
                                    📄 Download Your Receipt
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/problems")}
                                    className="flex-1 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500"
                                >
                                    Go to Problems
                                </button>

                            </div>

                        </motion.div>
                    )}


                    {/* ERROR */}

                    {error && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-700"
                        >
                            {error}
                        </motion.div>
                    )}


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* NAME */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Problem Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={problem.name}
                                onChange={handleChange}
                                placeholder="Enter problem name"
                                required
                                disabled={uploaded}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500 disabled:opacity-60"
                            />

                        </div>


                        {/* PLACE */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Place
                            </label>

                            <input
                                type="text"
                                name="place"
                                value={problem.place}
                                onChange={handleChange}
                                placeholder="Enter place"
                                required
                                disabled={uploaded}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500 disabled:opacity-60"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={problem.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                                rows="4"
                                required
                                disabled={uploaded}
                                className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500 disabled:opacity-60"
                            />

                        </div>


                        {/* CONDITION */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Condition
                            </label>

                            <textarea
                                name="conditions"
                                value={problem.conditions}
                                onChange={handleChange}
                                placeholder="Enter current condition"
                                rows="3"
                                required
                                disabled={uploaded}
                                className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500 disabled:opacity-60"
                            />

                        </div>


                        {/* EXPECTATION */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Expectation
                            </label>

                            <textarea
                                name="expectation"
                                value={problem.expectation}
                                onChange={handleChange}
                                placeholder="Enter expected solution"
                                rows="3"
                                required
                                disabled={uploaded}
                                className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500 disabled:opacity-60"
                            />

                        </div>


                        {/* IMAGE */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Problem Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                disabled={uploaded}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-gray-300 disabled:opacity-60"
                            />

                        </div>


                        {/* IMAGE PREVIEW */}

                        {preview && (
                            <div>

                                <p className="mb-2 font-semibold text-gray-300">
                                    Image Preview
                                </p>

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-56 w-full rounded-lg object-cover"
                                />

                            </div>
                        )}


                        {/* BUTTONS */}

                        {!uploaded && (
                            <div className="flex gap-4 pt-4">

                                <button
                                    type="button"
                                    onClick={() => navigate("/problems")}
                                    className="flex-1 rounded-lg border border-gray-500 px-5 py-3 font-semibold text-gray-300 transition hover:bg-gray-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving
                                        ? "Adding..."
                                        : "Add Problem"}
                                </button>

                            </div>
                        )}

                    </form>

                </motion.div>

            </div>
        </>
    );
};

export default Add;