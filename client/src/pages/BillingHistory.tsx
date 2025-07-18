import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navbar } from "../components/Navbar";

const BillingHistory = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get("/billing/history").then(res => setInvoices(res.data));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">🧾 Billing History</h1>
                {invoices.length === 0 ? (
                    <p>No invoices found.</p>
                ) : (
                    <table className="w-full text-left border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Amount (₹)</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice: any) => (
                                <tr key={invoice.id} className="border-t">
                                    <td className="p-3">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3">{invoice.amount}</td>
                                    <td className="p-3 capitalize">{invoice.status}</td>
                                    <td className="p-3">{invoice.method}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default BillingHistory;
