import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navbar } from "../components/Navbar";

const Pricing = () => {
    const [plans, setPlans] = useState<any[]>([]);
    useEffect(() => {
        axios.get("/plans")
            .then(res => setPlans(res.data))
            .catch(() => alert("Failed to load plans"));
    }, []);

    const subscribe = async (planId: string) => {
        try {
            await axios.post("/subscribe/subscribe", { planId });
            alert("Subscribed successfully!");
            window.location.href = "/dashboard";
        } catch (err) {
            console.error(err);
            alert("Error subscribing to plan");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Choose a Plan</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className="border rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold">{plan.name}</h2>
                            <p className="text-gray-600 mb-4">₹{plan.price} / month</p>
                            <button
                                className="bg-purple-600 text-white px-4 py-2 rounded-md"
                                onClick={() => subscribe(plan.id)}
                            >
                                Subscribe
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
