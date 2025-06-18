import prisma from "./client";

async function main() {
    await prisma.plan.createMany({
        data: [
            {
                name: "Free",
                price: 0,
                description: "Basic features for small teams",
                features: JSON.stringify(["1 project", "Community support"])
            },
            {
                name: "Pro",
                price: 199,
                description: "Advanced features for growing businesses",
                features: JSON.stringify(["10 projects", "Email support", "Analytics"])
            },
            {
                name: "Enterprise",
                price: 499,
                description: "All features and priority support",
                features: JSON.stringify(["Unlimited projects", "Priority support", "SLA"])
            }
        ]
    });
    console.log("Plans seeded!");
}

main().finally(() => prisma.$disconnect());
