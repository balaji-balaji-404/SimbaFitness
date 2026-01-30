"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle, Search, UserPlus } from "lucide-react";

interface User {
    _id: string;
    name: string;
    email: string;
    branch: string;
    subscriptionPlan: string;
    subscriptionEndDate: string;
    role: string;
}

import AddUserModal from "./AddUserModal";

const UserTable = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        if (!user?.token) return;
        try {
            const res = await fetch("http://localhost:5001/api/users", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [user]);

    const getDaysRemaining = (endDate: string) => {
        if (!endDate) return -1;
        const diff = new Date(endDate).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort expiring soon first
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const daysA = getDaysRemaining(a.subscriptionEndDate);
        const daysB = getDaysRemaining(b.subscriptionEndDate);
        // If expired or expiring soon (<= 7 days), prioritize
        const priorityA = daysA <= 7 && daysA > -100 ? 1 : 0;
        const priorityB = daysB <= 7 && daysB > -100 ? 1 : 0;
        return priorityB - priorityA;
    });

    if (isLoading) return <div className="text-white">Loading users...</div>;

    return (
        <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row justify-between gap-4">
                    <h2 className="text-xl font-bold text-white">Member Management</h2>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 w-full md:w-64"
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 text-sm"
                        >
                            <UserPlus size={18} /> Add Member
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-black/50 text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Branch</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Expires In</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {sortedUsers.map((u) => {
                                const days = getDaysRemaining(u.subscriptionEndDate);
                                const isExpiring = days <= 5 && days >= 0;
                                const isExpired = days < 0 && u.subscriptionEndDate;
                                return (
                                    <tr key={u._id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{u.name} <br /><span className="text-gray-500 text-xs font-normal">{u.email}</span></td>
                                        <td className="px-6 py-4">{u.branch}</td>
                                        <td className="px-6 py-4">{u.subscriptionPlan || "None"}</td>
                                        <td className="px-6 py-4">
                                            {isExpired ? (
                                                <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold">Expired</span>
                                            ) : u.subscriptionEndDate ? (
                                                <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-bold">Active</span>
                                            ) : (
                                                <span className="bg-gray-500/20 text-gray-500 px-2 py-1 rounded text-xs font-bold">New</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {isExpiring ? (
                                                <div className="flex items-center gap-2 text-red-400 font-bold">
                                                    <AlertTriangle size={16} /> {days} days
                                                </div>
                                            ) : isExpired ? (
                                                <span className="text-gray-600">Ended</span>
                                            ) : u.subscriptionEndDate ? (
                                                <span>{days} days</span>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <AddUserModal onClose={() => setIsModalOpen(false)} onUserAdded={fetchUsers} />}
        </>
    );
};

export default UserTable;
