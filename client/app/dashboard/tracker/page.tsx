"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from "recharts";
import { Activity, Weight, Flame, ChevronRight, Plus, History } from "lucide-react";
import { API_URL } from "@/lib/constants";

const TrackerPage = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [calories, setCalories] = useState("");
    const [weight, setWeight] = useState("");
    const [meal, setMeal] = useState("Breakfast");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
                const res = await fetch(`${API_URL}/calories/my-logs`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                const data = await res.json();
                // Map data for charting
                const chartData = data.map((log: any) => ({
                    date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    weight: log.weight || 75, // Default for mock
                    calories: log.calories
                }));
                setLogs(chartData);
            } catch (error) {
                console.error("Failed to fetch logs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const handleLog = async (e: any) => {
        e.preventDefault();
        // Post to backend (assumes existing endpoint works, just adding weight)
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            await fetch(`${API_URL}/calories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ foodItem: meal, calories: Number(calories), weight: Number(weight), mealType: meal })
            });
            window.location.reload();
        } catch (error) {
            console.error("Failed to log", error);
        }
    };

    if (loading) return null;

    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-5xl font-black text-white mb-2 uppercase tracking-tighter italic">
                        PROGRESSION <span className="text-primary text-outline">TRACKER</span>
                    </h1>
                    <p className="text-gray-500 font-mono">TRACK YOUR KCAL & WEIGHT FLUCTUATIONS DAILY.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log Form */}
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="text-primary" />
                            <h3 className="text-xl font-bold text-white uppercase">New Entry</h3>
                        </div>
                        <form onSubmit={handleLog} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest">Weight (KG)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                                    placeholder="e.g. 72.5"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest">Calories Intake</label>
                                <input
                                    type="number"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                                    placeholder="e.g. 450"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest">Meal Type</label>
                                <select
                                    value={meal}
                                    onChange={(e) => setMeal(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                                >
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                    <option>Snack</option>
                                </select>
                            </div>
                            <button className="w-full bg-primary text-black font-black py-4 rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                                <Plus size={20} />
                                LOG PROGRESS
                            </button>
                        </form>
                    </div>

                    {/* Chart Container */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase">Weight Progression</h3>
                                    <p className="text-xs text-gray-500">Visualizing your body weight scale trends</p>
                                </div>
                                <Weight className="text-primary opacity-50" />
                            </div>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={logs}>
                                        <defs>
                                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#D9FF00" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#D9FF00" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                                        <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#18181b", border: "1px solid #333", borderRadius: "12px" }}
                                        />
                                        <Area type="monotone" dataKey="weight" stroke="#D9FF00" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <History className="text-primary" />
                                <h3 className="text-xl font-bold text-white uppercase">Daily Logs</h3>
                            </div>
                            <div className="space-y-4">
                                {logs.slice(-5).reverse().map((log: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <Flame size={18} className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">{log.calories} KCAL</p>
                                                <p className="text-xs text-gray-500 uppercase">{log.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-black">{log.weight}kg</p>
                                            <p className="text-[10px] text-primary font-bold">MEASURED</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TrackerPage;
