"use client";

import { motion } from "framer-motion";

const trainers = [
    { name: "Alex Strong", role: "Head Coach", exp: "10+ Years", image: "/trainers/new-trainer-1.jpg" },
    { name: "Sarah Power", role: "Nutritionist", exp: "8 Years", image: "/trainers/new-trainer-2.jpg" },
    { name: "Mike Lift", role: "CrossFit Expert", exp: "6 Years", image: "/trainers/new-trainer-3.jpg" },
];

const About = () => {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden" id="about">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">
                            OUR <span className="text-primary block">LEGACY</span>
                        </h2>
                        <div className="w-20 h-2 bg-primary mb-8" />
                        <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                            <strong className="text-white">Simba Fitness</strong> wasn't built in a day. It was forged in sweat, determination, and unyielding will. From humble beginnings to a powerhouse of transformation, we define strength.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            We don't just train bodies; we cultivate the mindset of a champion.
                        </p>
                    </motion.div>

                    <div className="relative h-[500px] group overflow-hidden rounded-2xl border border-white/10">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity z-0" />
                        <img
                            src="/about/legacy-gym.jpg"
                            alt="Simba Fitness Legacy Gym"
                            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-in-out z-10 relative"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20 pointer-events-none" />
                        <div className="absolute bottom-8 right-8 z-30 text-right">
                            <span className="text-4xl font-black text-white/20 block mb-0 leading-none">EST.</span>
                            <span className="text-6xl font-black text-white leading-none">2020</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter">ELITE <span className="text-primary">COACHES</span></h3>
                        <span className="hidden md:block text-gray-500 font-mono text-sm">/ EXPERT GUIDANCE</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {trainers.map((trainer, idx) => (
                            <div key={idx} className="bg-zinc-900/50 border border-white/5 hover:border-primary/50 hover:bg-zinc-900 transition-all duration-300 group relative overflow-hidden">
                                <div className="h-[400px] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                                    <img
                                        src={trainer.image}
                                        alt={trainer.name}
                                        className="w-full h-full object-cover filter grayscale-[100%] contrast-125 brightness-110 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                    <h4 className="text-2xl font-bold text-white mb-1 uppercase tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform">{trainer.name}</h4>
                                    <p className="text-primary font-mono text-sm mb-1">{trainer.role}</p>
                                    <p className="text-gray-400 text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity delay-100">{trainer.exp} Professional Experience</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
