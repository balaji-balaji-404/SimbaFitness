import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get revenue statistics
// @route   GET /api/revenue
// @access  Private/Admin
const getRevenueStats = asyncHandler(async (req, res) => {
    const users = await User.find({});

    // Simulate revenue calculation
    // Monthly goal: 2,00,000 (2L)
    const monthlyGoal = 200000;

    // Calculate total revenue from active subscriptions (randomly simulated for demo)
    // In a real app, this would query a 'Payments' or 'Transactions' collection
    const totalRevenue = users.reduce((acc, user) => {
        if (user.isActive && user.subscriptionPlan) {
            const planValue = user.subscriptionPlan === "1 Year" ? 15000 : 5000;
            return acc + planValue;
        }
        return acc;
    }, 0);

    // Mock growth data for the line chart
    const revenueGrowth = [
        { month: "Jan", amount: 120000 },
        { month: "Feb", amount: 150000 },
        { month: "Mar", amount: 180000 },
        { month: "Apr", amount: totalRevenue },
    ];

    // Mock pie chart data (New vs Expired)
    const newUsers = users.filter(u => {
        const joinedDate = new Date(u.createdAt);
        const now = new Date();
        return joinedDate.getMonth() === now.getMonth();
    }).length;

    const expiredSubscriptions = users.filter(u => {
        return !u.isActive && u.subscriptionEndDate < new Date();
    }).length;

    res.json({
        totalRevenue,
        monthlyGoal,
        pendingPayments: 45000, // Mocked
        revenueGrowth,
        stats: [
            { name: "New Joinees", value: newUsers || 5 },
            { name: "Expirations", value: expiredSubscriptions || 2 }
        ]
    });
});

export { getRevenueStats };
