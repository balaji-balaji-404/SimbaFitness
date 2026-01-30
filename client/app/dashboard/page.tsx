"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserProfile from "@/components/dashboard/UserProfile";
import CalorieTracker from "@/components/dashboard/CalorieTracker";

const Dashboard = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-yellow-500">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome, <span className="text-yellow-500">{user.name.split(" ")[0]}</span>
                    </h1>
                    <p className="text-gray-400">Here's your daily overview.</p>
                </div>

                <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                        <UserProfile />
                    </div>
                    <div className="md:col-span-8">
                        <CalorieTracker />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
