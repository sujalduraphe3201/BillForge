import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navbar } from "../components/Navbar";

const Usage = () => {
    const [usageSummary, setUsageSummary] = useState<
        { metric: string; _sum: { amount: number } }[]
    >([]);
            

    useEffect(() => {
        axios.get("/usage-summary").then((res) => setUsageSummary(res.data));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">📊 Usage Summary</h1>
                <div className="grid gap-4">
                    {usageSummary.length === 0 ? (
                        <p className="text-gray-500">No usage data available.</p>
                    ) : (
                        usageSummary.map((item) => (
                            <div key={item.metric} className="bg-white p-4 rounded shadow">
                                <h2 className="text-lg font-semibold">{item.metric}</h2>
                                <p className="text-gray-600">Total Used: {item._sum.amount}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Usage;
