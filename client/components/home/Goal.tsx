"use client";

import { motion } from "framer-motion";

const Goal = () => {
    return (
        <section className="py-20 bg-zinc-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter">
                            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">GOAL</span>
                        </h2>
                        <blockquote className="text-2xl font-light text-gray-300 border-l-4 border-yellow-500 pl-6">
                            "To empower every individual to push their limits, break barriers, and redefine their potential."
                        </blockquote>
                        <p className="text-gray-400 text-lg">
                            At Simba Fitness, we don't just build bodies; we build character. Our goal is to provide a sanctuary where sweat turns into strength and dedication into results.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
                    >
                        {/* "After" Image (Result) */}
                        <img
                            src="/goal/fit.jpg"
                            alt="Transformation After"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* "Before" Image (Initial) - Reveals on Hover */}
                        <motion.div
                            className="absolute inset-0 w-full h-full z-10"
                            initial={{ clipPath: 'inset(0 0 0 0)' }}
                            whileHover={{ clipPath: 'inset(0 0 0 100%)' }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <img
                                src="/goal/fat.jpg"
                                alt="Transformation Before"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </motion.div>

                        {/* Overlay Text */}
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-3xl font-black uppercase italic text-white drop-shadow-2xl">
                                Real <span className="text-primary italic">Results</span>
                            </h3>
                            <p className="text-sm font-bold text-gray-300 uppercase tracking-widest mt-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg inline-block border border-white/10">
                                Hover to see the transformation
                            </p>
                        </div>

                        {/* Split line decoration */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 z-0 hidden group-hover:block" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Goal;
