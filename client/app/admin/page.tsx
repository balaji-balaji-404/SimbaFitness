"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserTable from "@/components/admin/UserTable";

const AdminDashboard = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/login");
            } else if (!user.isAdmin) {
                router.push("/dashboard"); // Redirect non-admins
            }
        }
    }, [user, isLoading, router]);


    if (isLoading || !user || !user.isAdmin) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-yellow-500">
                Loading Admin Panel...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Admin <span className="text-yellow-500">Dashboard</span>
                        </h1>
                        <p className="text-gray-400">Manage members and subscriptions.</p>
                    </div>
                </div>

                <UserTable />
            </div>
        </main>
    );
};

export default AdminDashboard;
