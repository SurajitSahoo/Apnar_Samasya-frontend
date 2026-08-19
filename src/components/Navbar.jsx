import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();
    const cookies = new Cookies();

    // ==============================
    // LOGOUT
    // ==============================

    const handleLogout = () => {

        // Remove JWT
        cookies.remove("token", {
            path: "/",
        });

        // Remove username
        localStorage.removeItem("username");

        console.log("Logout successful");

        // Go to login
        navigate("/");
    };


    // ==============================
    // CLOSE MOBILE MENU
    // ==============================

    const closeMenu = () => {
        setShowMenu(false);
    };


    return (
        <motion.nav
            className="
                fixed
                top-0
                left-0
                w-full
                z-50
                bg-gray-900/90
                backdrop-blur-sm
                py-3
                px-6
                shadow-lg
            "
        >

            <div className="container mx-auto flex items-center justify-between">

                {/* ==============================
                    LOGO
                ============================== */}

                <div>
                    <Link
                        to="/home"
                        className="text-2xl md:text-3xl font-bold text-yellow-400"
                    >
                        Apnar{" "}
                        <span className="text-green-400">
                            Samasya
                        </span>
                    </Link>
                </div>


                {/* ==============================
                    DESKTOP MENU
                ============================== */}

                <div className="hidden md:flex items-center gap-8">

                    <Link
                        to="/home"
                        className="text-white transition duration-300 hover:text-green-400"
                    >
                        Home
                    </Link>

                    <Link
                        to="/problems"
                        className="text-white transition duration-300 hover:text-green-400"
                    >
                        Problems
                    </Link>

                    <Link
                        to="/add"
                        className="text-white transition duration-300 hover:text-green-400"
                    >
                        Upload
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="text-white transition duration-300 hover:text-red-400"
                    >
                        Logout
                    </button>

                </div>


                {/* ==============================
                    MOBILE ICON
                ============================== */}

                <div className="md:hidden">

                    {showMenu ? (

                        <FaXmark
                            onClick={() => setShowMenu(false)}
                            className="cursor-pointer text-2xl text-white"
                        />

                    ) : (

                        <FaBars
                            onClick={() => setShowMenu(true)}
                            className="cursor-pointer text-2xl text-white"
                        />

                    )}

                </div>

            </div>


            {/* ==============================
                MOBILE MENU
            ============================== */}

            {showMenu && (

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="
                        md:hidden
                        mt-3
                        rounded-lg
                        bg-gray-800
                        px-6
                        py-5
                        shadow-lg
                    "
                >

                    <div className="flex flex-col gap-5">

                        <Link
                            to="/home"
                            onClick={closeMenu}
                            className="text-white transition hover:text-green-400"
                        >
                            Home
                        </Link>

                        <Link
                            to="/problems"
                            onClick={closeMenu}
                            className="text-white transition hover:text-green-400"
                        >
                            Problems
                        </Link>

                        <Link
                            to="/add"
                            onClick={closeMenu}
                            className="text-white transition hover:text-green-400"
                        >
                            Upload
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-left text-white transition hover:text-red-400"
                        >
                            Logout
                        </button>

                    </div>

                </motion.div>

            )}

        </motion.nav>
    );
};

export default Navbar;