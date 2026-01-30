"use client";

import Link from "next/link";

import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            <motion.div
                initial={{ opacity: 0, filter: "grayscale(100%)", scale: 1.1 }}
                animate={{
                    opacity: 1,
                    filter: "grayscale(0%)",
                    scale: [1.1, 1.25, 1.1]
                }}
                transition={{
                    opacity: { duration: 1.5, ease: "easeOut" },
                    filter: { duration: 1.5, ease: "easeOut" },
                    scale: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
                className="absolute inset-0 z-0 origin-center"
            >
                <img
                    src="/logo-hero.png"
                    alt="Simba Fitness Background"
                    className="w-full h-full object-cover"
                />
                {/* Stronger gradient at bottom to support text */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </motion.div>

            {/* Content moved to bottom, smaller fonts, non-intrusive */}
            <div className="absolute bottom-0 inset-x-0 z-10 px-6 pb-6 pt-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6 border-t border-white/10 pt-6 backdrop-blur-sm bg-black/20">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-left"
                    >
                        <h1 className="text-xl md:text-3xl font-bold uppercase tracking-widest text-white mb-1 leading-none">
                            Sculpt Your <span className="text-primary">Body</span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
                            Elevate Your Spirit
                        </p>
                    </motion.div>

                    <div className="flex items-center gap-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="flex items-center gap-6 text-gray-400 font-mono text-xs hidden md:flex"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">2.5k+</span>
                                <span className="uppercase tracking-wider">Members</span>
                            </div>
                            <div className="w-px h-4 bg-white/20" />
                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">100%</span>
                                <span className="uppercase tracking-wider">Dedication</span>
                            </div>
                        </motion.div>

                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-zinc-800 text-white border border-white/10 px-6 py-2 text-sm font-bold uppercase hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                            >
                                Start Now
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>


            {/* Scroll indicator - kept for navigation hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-yellow-500 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

