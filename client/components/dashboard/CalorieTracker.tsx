"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Plus, Trash2, Utensils } from "lucide-react";

interface CalorieLog {
    _id: string;
    foodItem: string;
    calories: number;
    mealType: string;
}

const CalorieTracker = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState<CalorieLog[]>([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [dailyGoal] = useState(2500); // Default goal
    const [isLoading, setIsLoading] = useState(true);

    // Form State
    const [foodItem, setFoodItem] = useState("");
    const [calories, setCalories] = useState("");
    const [mealType, setMealType] = useState("Breakfast");

    const fetchLogs = async () => {
        if (!user?.token) return;
        try {
            const res = await fetch("http://localhost:5001/api/calories", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await res.json();
            setLogs(data.logs);
            setTotalCalories(data.totalCalories);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [user]);

    const handleAddLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.token) return;

        try {
            const res = await fetch("http://localhost:5001/api/calories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    foodItem,
                    calories: Number(calories),
                    mealType,
                }),
            });

            if (res.ok) {
                setFoodItem("");
                setCalories("");
                fetchLogs();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!user?.token) return;
        try {
            await fetch(`http://localhost:5001/api/calories/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchLogs();
        } catch (err) {
            console.error(err);
        }
    }

    const progress = Math.min((totalCalories / dailyGoal) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Utensils size={20} className="text-yellow-500" /> Daily Intake
                </h2>
                <span className="text-xs text-gray-500 bg-zinc-800 px-2 py-1 rounded">
                    Target: {dailyGoal} kcal
                </span>
            </div>

            <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-bold">{totalCalories} / {dailyGoal} kcal</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className={`h-full rounded-full ${progress > 100 ? "bg-red-500" : "bg-gradient-to-r from-yellow-500 to-yellow-300"
                            }`}
                    />
                </div>
            </div>

            <form onSubmit={handleAddLog} className="mb-6 grid grid-cols-12 gap-2">
                <div className="col-span-12 md:col-span-5">
                    <input
                        type="text"
                        placeholder="Food Item"
                        required
                        value={foodItem}
                        onChange={(e) => setFoodItem(e.target.value)}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                    />
                </div>
                <div className="col-span-4 md:col-span-3">
                    <input
                        type="number"
                        placeholder="Kcal"
                        required
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 appearance-none"
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <button
                        type="submit"
                        className="w-full h-full bg-yellow-500 text-black rounded-lg flex items-center justify-center hover:bg-yellow-400"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </form>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {isLoading ? (
                    <p className="text-gray-500 text-center text-sm">Loading logs...</p>
                ) : logs.length === 0 ? (
                    <p className="text-gray-500 text-center text-sm py-4">No logs for today.</p>
                ) : (
                    logs.map((log) => (
                        <div key={log._id} className="bg-zinc-800/50 p-3 rounded-lg flex justify-between items-center group">
                            <div>
                                <p className="text-white text-sm font-medium">{log.foodItem}</p>
                                <p className="text-gray-500 text-xs">{log.mealType}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-yellow-500 font-bold text-sm">{log.calories}</span>
                                <button
                                    onClick={() => handleDelete(log._id)}
                                    className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default CalorieTracker;
