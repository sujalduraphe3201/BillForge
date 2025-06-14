import prisma from "./client";

async function main() {
    await prisma.plan.createMany({
        data: [
            { name: "Free", price: 0 },
            { name: "Pro", price: 49 },
            { name: "Enterprise", price: 199 }
        ]
    });
    console.log("Plans seeded!");
}

main().finally(() => prisma.$disconnect());
