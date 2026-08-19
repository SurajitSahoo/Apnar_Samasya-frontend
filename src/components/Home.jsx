import React from "react";
import Hero from "./Hero";
import Problems from "./Problems";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from './Footer';
import HomeProblem from './HomeProblem';

const Home = () => {

    const navigate = useNavigate();

    const handleViewProblems = () => {
        navigate("/problems");
    };

    return (
        <div className="bg-black min-h-screen">

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Problems Section */}
            <HomeProblem limit={6} />

            

        </div>
        
    );
};

export default Home;