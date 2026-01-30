"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { API_URL } from "@/lib/constants";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        branch: "Coimbatore",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch(`${API_URL}/enquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");

                // Construct WhatsApp Message
                const message = encodeURIComponent(
                    `*NEW ENQUIRY - SIMBA FITNESS*\n\n` +
                    `*Name:* ${formData.name}\n` +
                    `*Email:* ${formData.email}\n` +
                    `*Branch:* ${formData.branch}\n` +
                    `*Message:* ${formData.message || "No message provided"}`
                );

                // Redirect to WhatsApp after a short delay
                setTimeout(() => {
                    const whatsappUrl = `https://wa.me/918667610411?text=${message}`;
                    window.open(whatsappUrl, "_blank");
                    setFormData({ name: "", email: "", branch: "Coimbatore", message: "" });
                }, 1500);

            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-black pt-24 px-4 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        START YOUR <span className="text-yellow-500">JOURNEY</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Ready to transform? Fill out the form below and we'll get in touch with you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-medium">Preferred Branch</label>
                            <select
                                value={formData.branch}
                                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors appearance-none"
                            >
                                <option value="Coimbatore">Coimbatore</option>
                                <option value="Pollachi">Pollachi</option>
                                <option value="Udumalaipet">Udumalaipet</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-medium">Message (Optional)</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors h-32 resize-none"
                                placeholder="Tell us about your fitness goals..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "SENDING..." : "SUBMIT ENQUIRY"}
                        </button>

                        {status === "success" && (
                            <p className="text-green-500 text-center mt-4">Enquiry sent successfully! We'll contact you soon.</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 text-center mt-4">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </main>
    );
};

export default Contact;
