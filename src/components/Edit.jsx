import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import baseURL from './../api/api';

const Edit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [problem, setProblem] = useState({
        name: "",
        place: "",
        description: "",
        conditions: "",
        expectation: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const cookies = new Cookies();

    // ==============================
    // FETCH PROBLEM
    // ==============================

    const fetchProblem = async () => {

        const token = cookies.get("token");

        if (!token) {
            navigate("/");
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

            const problems = response.data;

            const selectedProblem = problems.find(
                (item) => item.id === Number(id)
            );

            if (!selectedProblem) {
                setError("Problem not found.");
                setLoading(false);
                return;
            }

            console.log("Selected problem:", selectedProblem);

            // Set form data
            setProblem({
                name: selectedProblem.name || "",
                place: selectedProblem.place || "",
                description: selectedProblem.description || "",
                conditions: selectedProblem.conditions || "",
                expectation: selectedProblem.expectation || "",
            });

            // Save old image information
            setOldImage({
                imageData: selectedProblem.imageData,
                imageType: selectedProblem.imageType,
                imageName: selectedProblem.imageName,
            });

        } catch (error) {

            console.error("Error fetching problem:", error);

            if (error.response?.status === 401) {
                navigate("/");
            } else {
                setError("Failed to load problem.");
            }

        } finally {
            setLoading(false);
        }
    };


    // ==============================
    // INPUT CHANGE
    // ==============================

    const handleChange = (e) => {

        setProblem({
            ...problem,
            [e.target.name]: e.target.value,
        });

    };


    // ==============================
    // IMAGE CHANGE
    // ==============================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
        }

    };


    // ==============================
    // BASE64 → FILE
    // ==============================

    const base64ToFile = (base64, fileName, mimeType) => {

        const byteCharacters = atob(base64);

        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        return new File(
            [byteArray],
            fileName || "old-image",
            {
                type: mimeType || "image/jpeg",
            }
        );
    };


    // ==============================
    // UPDATE
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = cookies.get("token");

        if (!token) {
            navigate("/");
            return;
        }

        setSaving(true);
        setError("");

        try {

            const formData = new FormData();

            // Product object
            const productBlob = new Blob(
                [JSON.stringify(problem)],
                {
                    type: "application/json",
                }
            );

            formData.append("prod", productBlob);

            // Image
            if (imageFile) {

                // New image selected
                formData.append("imageFile", imageFile);

            } else if (oldImage?.imageData) {

                // Use existing image
                const oldFile = base64ToFile(
                    oldImage.imageData,
                    oldImage.imageName,
                    oldImage.imageType
                );

                formData.append("imageFile", oldFile);

            } else {

                setError("Please select an image.");
                setSaving(false);
                return;
            }


            const response = await axios.put(
                `${baseURL}/api/updateproblem/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Updated problem:", response.data);

            alert("Problem updated successfully!");

            navigate("/problems");

        } catch (error) {

            console.error("Update error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

            if (error.response?.status === 401) {
                navigate("/");
            } else if (error.response?.status === 403) {
                setError("You don't have permission to update this problem.");
            } else {
                setError("Failed to update problem.");
            }

        } finally {
            setSaving(false);
        }
    };


    // ==============================
    // FETCH ON PAGE LOAD
    // ==============================

    useEffect(() => {
        fetchProblem();
    }, [id]);


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a]">

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="h-12 w-12 rounded-full border-4 border-gray-600 border-t-green-500"
                />

            </div>
        );
    }


    // ==============================
    // UI
    // ==============================

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-linear-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] px-6 py-24">

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

                    {/* Heading */}

                    <h1 className="mb-8 text-center text-3xl font-bold text-white">
                        Edit Problem
                    </h1>


                    {/* Error */}

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-700">
                            {error}
                        </div>
                    )}


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
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
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
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
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
                                className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
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
                                placeholder="Enter condition"
                                rows="3"
                                required
                                className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
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
                                placeholder="Enter expectation"
                                rows="3"
                                required
                                className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
                            />

                        </div>


                        {/* IMAGE */}

                        <div>

                            <label className="mb-2 block font-semibold text-gray-300">
                                Change Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-gray-300"
                            />

                        </div>


                        {/* CURRENT IMAGE */}

                        {oldImage?.imageData && (
                            <div>

                                <p className="mb-2 font-semibold text-gray-300">
                                    Current Image
                                </p>

                                <img
                                    src={`data:${oldImage.imageType};base64,${oldImage.imageData}`}
                                    alt="Current"
                                    className="h-48 w-full rounded-lg object-cover"
                                />

                            </div>
                        )}


                        {/* NEW IMAGE PREVIEW */}

                        {imageFile && (
                            <div>

                                <p className="mb-2 font-semibold text-gray-300">
                                    New Image
                                </p>

                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Preview"
                                    className="h-48 w-full rounded-lg object-cover"
                                />

                            </div>
                        )}


                        {/* BUTTONS */}

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
                                {saving ? "Updating..." : "Update Problem"}
                            </button>

                        </div>

                    </form>

                </motion.div>

            </div>
        </>
    );
};

export default Edit;