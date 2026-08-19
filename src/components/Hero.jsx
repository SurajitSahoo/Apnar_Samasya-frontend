import React from 'react'
import { motion} from 'framer-motion';
import profileImg from '../images/profileImg.jpg';
import { Link } from 'react-router-dom';
const Hero=()=>
{
    return(
        <motion.div initial={{opacity:0, y:50}}
        whileInView={{opacity:1, y:0}}
        transition={{duration: 0.6, ease: 'easeOut'}}
        viewport={{once: true}}
        className='min-h-screen flex items-center pt-20 pb-16 bg-linear-to-r from-[#1a1a1a] via-[#111111] to-[#1a1a1a]'
        >
            <div className='container mx-auto px-6 flex flex-col md:flex-row
            items-center justify-between'>
                <div className='md:w-1/2 mb-10 md:mb-0'>
                    <h1 className='text-4xl md:text-6xl text-white font-bold mb-4'>Welcome To<span className='text-green-500'> Apnar Samasya</span>
                    </h1>
                    <h2 className='text-2xl md:text-4xl text-white font-semibold mb-6 typewriter'>A website to share you problem</h2>
                    <p className='text-lg text-white mb-8'>I created this website for people where they can share their problems. 
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/problems" className='px-6 py-3 bg-green-900 rounded-lg text-white font-medium hover:bg-green-500 transition duration-300'>View Problems</Link>
                    </div>
                </div>
                {/* right side image */}
                <div className='md:w-1/2 flex justify-center'>
                <div className='relative w-64 h-64 md:w-80 md:h-80'>
                    <div className='absolute inset-0 rounded-full bg-linear-to-r from-yellow-200 to-green-300
                    opacity-70'>
                        <motion.img animate={{y:[0,-20, 2]}}
                        transition={{duration:4 , repeat:Infinity, repeatType:"loop",
                            ease:"easeInout"
                        }} className='relative rounded-full w-64 h-64 md:w-80
                         md:h-80 object-cover z-10 animate-float ' src={profileImg} alt="Profile"></motion.img></div>
                    </div></div>
            </div>
        </motion.div>
    )
}

export default Hero;