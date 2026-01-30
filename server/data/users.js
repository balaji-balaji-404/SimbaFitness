import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10), // hashed password
        isAdmin: true,
        role: "admin",
        branch: "Coimbatore",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
        role: "member",
        branch: "Pollachi",
        age: 30,
        height: 175,
        weight: 70,
        subscriptionPlan: "3 Months",
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        isActive: true,
    },
];

export default users;
