"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

interface AddUserModalProps {
    onClose: () => void;
    onUserAdded: () => void;
}

const AddUserModal = ({ onClose, onUserAdded }: AddUserModalProps) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "password123", // Default password
        branch: "Coimbatore",
        role: "member",
        subscriptionPlan: "3 Months",
        dob: "",
        height: "",
        weight: "",
        age: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Calculate subscription end date based on plan
        const startDate = new Date();
        const endDate = new Date(startDate);
        if (formData.subscriptionPlan === "1 Month") {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (formData.subscriptionPlan === "3 Months") {
            endDate.setMonth(endDate.getMonth() + 3);
        } else if (formData.subscriptionPlan === "6 Months") {
            endDate.setMonth(endDate.getMonth() + 6);
        } else if (formData.subscriptionPlan === "1 Year") {
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        try {
            const res = await fetch("http://localhost:5001/api/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    subscriptionEndDate: endDate,
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    age: Number(formData.age),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                onUserAdded();
                onClose();
            } else {
                setError(data.message || "Failed to add user");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Add New Member</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-gray-400 mb-1 text-sm">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Default Password</label>
                        <input
                            type="text"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Branch</label>
                        <select
                            value={formData.branch}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        >
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Pollachi">Pollachi</option>
                            <option value="Udumalaipet">Udumalaipet</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Plan</label>
                        <select
                            value={formData.subscriptionPlan}
                            onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        >
                            <option value="1 Month">1 Month</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="1 Year">1 Year</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Date of Birth</label>
                        <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Age</label>
                        <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Height (cm)</label>
                        <input
                            type="number"
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">Weight (kg)</label>
                        <input
                            type="number"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500 outline-none"
                        />
                    </div>

                    <div className="col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                        >
                            {isLoading ? "Adding Member..." : "Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
