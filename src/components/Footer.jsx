import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <motion.footer 
            viewport={{once: false, amount:0.2}} className="bg-linear-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] border-t border-gray-800 text-gray-300">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

                    {/* Logo / About */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 "
                    >
                        <Link
                            to="/home"
                            className="text-3xl font-bold"
                        >
                            <span className="text-gray-300">
                                Apnar
                            </span>{" "}
                            <span className="text-gray-300">
                                Samasya
                            </span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                            Apnar Samasya is a platform where people can
                            share their problems, discover solutions and
                            contribute to making their community better.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition duration-300 hover:bg-green-600 hover:text-white"
                            >
                                f
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition duration-300 hover:bg-green-600 hover:text-white"
                            >
                                𝕏
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition duration-300 hover:bg-green-600 hover:text-white"
                            >
                                in
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition duration-300 hover:bg-green-600 hover:text-white"
                            >
                                ◎
                            </a>

                        </div>

                    </motion.div>


                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >

                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/home"
                                    className="transition duration-300 hover:text-green-400"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/problems"
                                    className="transition duration-300 hover:text-green-400"
                                >
                                    Problems
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/add"
                                    className="transition duration-300 hover:text-green-400"
                                >
                                    Add Problem
                                </Link>
                            </li>


                        </ul>

                    </motion.div>


                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >

                        <h3 className="mb-5 text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-400">

                            <li className="flex gap-3">
                                <span>📧</span>
                                <span>
                                    support@apnarsamasya.com
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <span>📍</span>
                                <span>
                                    India
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <span>🌐</span>
                                <span>
                                    www.apnarsamasya.com
                                </span>
                            </li>

                        </ul>

                    </motion.div>

                </div>


                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-800 pt-6">

                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">

                        <p>
                            © {new Date().getFullYear()} Apnar Samasya.
                            All rights reserved.
                        </p>

                        <div className="flex gap-6">

                            <a
                                href="#"
                                className="transition hover:text-green-400"
                            >
                                Privacy Policy
                            </a>

                            <a
                                href="#"
                                className="transition hover:text-green-400"
                            >
                                Terms & Conditions
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </motion.footer>
    );
};

export default Footer;