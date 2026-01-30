"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const branches = [
    {
        name: "Coimbatore",
        image: "/branches/cbe.jpg",
        description: "Our flagship center with state-of-the-art equipment.",
    },
    {
        name: "Pollachi",
        image: "/branches/pollachi.jpg",
        description: "Spacious facility focused on cross-fit and functional training.",
    },
    {
        name: "Udumalaipet",
        image: "/branches/udumalaipet.jpg",
        description: "Expert trainers and a community-driven atmosphere.",
    },
];

const Branches = () => {
    return (
        <section className="py-20 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        OUR <span className="text-yellow-500">BRANCHES</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Experience world-class fitness facilities across multiple locations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {branches.map((branch, index) => (
                        <motion.div
                            key={branch.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div
                                className="relative w-[300px] h-[400px] bg-card/10 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-primary/90 text-black text-xs font-bold px-3 py-1 uppercase skew-x-[-10deg] block">
                                        <span className="block skew-x-[10deg]">Open 24/7</span>
                                    </span>
                                </div>

                                <div className="h-2/3 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />
                                    <img
                                        src={branch.image}
                                        alt={branch.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                                    />
                                </div>

                                <div className="h-1/3 p-6 flex flex-col justify-between relative z-20">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{branch.name}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">{branch.description}</p>
                                    </div>
                                    <button className="text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Enquire Now <span className="text-lg">→</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Branches;
