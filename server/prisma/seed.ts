import bcrypt from "bcryptjs";
import { prisma } from "./client";
async function main() {
    // 🔹 Seed Plans
    await prisma.plan.createMany({
        data: [
            {
                name: "Free",
                price: 0,
                description: "Basic features for small teams",
                features: JSON.stringify(["1 project", "Community support"]),
            },
            {
                name: "Pro",
                price: 199,
                description: "Advanced features for growing businesses",
                features: JSON.stringify(["10 projects", "Email support", "Analytics"]),
            },
            {
                name: "Enterprise",
                price: 499,
                description: "All features and priority support",
                features: JSON.stringify(["Unlimited projects", "Priority support", "SLA"]),
            },
        ],
    });
    console.log("✅ Plans seeded!");
   
    console.log("✅ Usage logs seeded!");

    // 🔹 Seed Tenant
    const tenant = await prisma.tenant.create({
        data: {
            id: "john123",
            name: "web Corp",
        },
    });
    console.log("✅ Tenant created!");


    const hashedPassword = await bcrypt.hash("john", 10);
    // 🔹 Seed User
    const user = await prisma.user.create({
        data: {
            name: "John",
            email: "John@gmail.com",
            password: hashedPassword,
            tenantId: tenant.id,
        },
    });
    console.log(`✅ User created: ${user.name}`);

    await prisma.invoices.createMany({
        data: [
            {
                tenantId: tenant.id,
                amount: 199,
                status: "Paid",
                method: "Razorpay",
                date: new Date("2024-04-15"),
            },
            {
                tenantId: tenant.id,
                amount: 499,
                status: "Paid",
                method: "Stripe",
                date: new Date("2024-05-20"),
            },
            {
                tenantId: tenant.id,
                amount: 199,
                status: "Failed",
                method: "Razorpay",
                date: new Date("2024-06-10"),
            },
            {
                tenantId: tenant.id,
                amount: 199,
                status: "Pending",
                method: "Stripe",
                date: new Date("2024-07-01"),
            },
        ],

    });
    console.log("✅ Billing (Invoices) seeded!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
