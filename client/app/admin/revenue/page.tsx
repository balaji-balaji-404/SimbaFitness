"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";
import { DollarSign, TrendingUp, Users, AlertCircle, ArrowUpRight, Target } from "lucide-react";

interface RevenueData {
    totalRevenue: number;
    monthlyGoal: number;
    pendingPayments: number;
    revenueGrowth: any[];
    stats: any[];
}

const RevenueDashboard = () => {
    const [data, setData] = useState<RevenueData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
                const res = await fetch("http://localhost:5001/api/revenue", {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch revenue", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const COLORS = ["#D9FF00", "#FF4D4D", "#36A2EB", "#FFCE56"];

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-primary text-xl font-bold animate-pulse">LOADING ANALYTICS...</div>
        </div>
    );

    const progression = data ? (data.totalRevenue / data.monthlyGoal) * 100 : 0;

    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
                        REVENUE <span className="text-primary">ANALYTICS</span>
                    </h1>
                    <p className="text-gray-400">Monthly financial performance and growth metrics.</p>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Revenue"
                        value={`₹${data?.totalRevenue.toLocaleString()}`}
                        icon={<DollarSign className="text-primary" />}
                        trend="+12.5%"
                    />
                    <StatCard
                        title="Monthly Goal"
                        value="₹2,00,000"
                        icon={<Target className="text-primary" />}
                        subtitle={`${progression.toFixed(1)}% Achieved`}
                    />
                    <StatCard
                        title="Pending"
                        value={`₹${data?.pendingPayments.toLocaleString()}`}
                        icon={<AlertCircle className="text-red-500" />}
                        subtitle="Action Required"
                    />
                    <StatCard
                        title="Active Users"
                        value="1.2k"
                        icon={<Users className="text-primary" />}
                        trend="+5%"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Revenue Growth Line Chart */}
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white uppercase">Growth Trend</h3>
                            <div className="flex items-center gap-2 text-primary text-sm font-bold">
                                <TrendingUp size={16} />
                                UPWARD
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data?.revenueGrowth}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D9FF00" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#D9FF00" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                                    <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#18181b", border: "1px solid #333", borderRadius: "12px", color: "#fff" }}
                                        itemStyle={{ color: "#D9FF00" }}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#D9FF00" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Subscription Pie Chart */}
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-white uppercase mb-8">User Churn Analysis</h3>
                        <div className="h-[300px] w-full flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.stats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data?.stats.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const StatCard = ({ title, value, icon, trend, subtitle }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-zinc-900 pb-6 rounded-3xl border border-white/5 p-6 relative overflow-hidden group transition-all"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {icon}
            </div>
            {trend && (
                <span className="text-primary text-xs font-bold px-2 py-1 bg-primary/10 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={12} />
                    {trend}
                </span>
            )}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
            <h4 className="text-3xl font-black text-white">{value}</h4>
            {subtitle && <p className="text-xs text-gray-500 mt-2 font-mono">{subtitle}</p>}
        </div>
    </motion.div>
);

export default RevenueDashboard;
