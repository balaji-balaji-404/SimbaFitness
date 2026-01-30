"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) return null;

    // Calculate days remaining (mock logic if date is string, needs parsing)
    // Assuming subscriptionEndDate is ISO string
    const daysRemaining = user.subscriptionEndDate
        ? Math.ceil(
            (new Date(user.subscriptionEndDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
        : 0;

    const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
    const isExpired = daysRemaining <= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${isExpired ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
                    }`}>
                    {isExpired ? "EXPIRED" : "ACTIVE MEMBER"}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 p-3 rounded-xl border border-zinc-800">
                    <p className="text-gray-500 text-xs uppercase mb-1">Branch</p>
                    <p className="text-white font-medium">{user.branch}</p>
                </div>
                {/* Placeholder for physical stats if available in user object */}
                <div className="bg-black/40 p-3 rounded-xl border border-zinc-800">
                    <p className="text-gray-500 text-xs uppercase mb-1">Plan</p>
                    <p className="text-white font-medium">Standard Access</p>
                </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
                <h3 className="text-gray-300 font-semibold mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-yellow-500" /> Subscription Status
                </h3>

                {isExpiringSoon && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-3 flex items-center gap-3">
                        <AlertTriangle size={20} />
                        <div>
                            <p className="font-bold text-sm">Action Required</p>
                            <p className="text-xs">Your subscription expires in {daysRemaining} days.</p>
                        </div>
                    </div>
                )}

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expires On</span>
                    <span className="text-white font-mono">
                        {user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString() : "N/A"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default UserProfile;
