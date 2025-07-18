import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navbar } from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [usage, setUsage] = useState<number>(0);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [billing, setBilling] = useState([]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get("/auth/me");
      setUser(userRes.data);

      const subRes = await axios.get("/subscribe/subscription");
      setSubscription(subRes.data[0]);

      const usageRes = await axios.get("/usage/total");
      setUsage(usageRes.data.total);

      const Billing = await axios.get("/usage/total");
      setBilling(Billing.data.total);

      const invoiceRes = await axios.get("/invoices/recent");
      setInvoices(invoiceRes.data.slice(0, 3));
      
      const res = await axios.get("/subscribe/billing");
      setBilling(res.data);
    };


    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 👋 Welcome */}
        <div className="text-xl font-semibold">
          👋 Hello, {user?.name}
          <div className="text-sm text-gray-600">Tenant: {user?.tenantId}</div>
        </div>

        {/* 💳 Subscription Info */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium">💳 Current Plan</h2>
          {subscription ? (
            <>
              <p>Plan: <strong>{subscription.plan.name}</strong></p>
              <p>Status: {subscription.status}</p>
              <p>Started: {new Date(subscription.startDate).toLocaleDateString()}</p>
              <p>Started: {new Date(subscription.endDate).toLocaleDateString()}</p>
            </>
          ) : <p>No subscription found.</p>}
        </div>

        {/* 📊 Usage Count */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium">📊 Total Usage</h2>
          <p className="text-xl font-bold text-purple-600">{usage} units</p>
        </div>

        <div className="bg-white shadow-md p-5 rounded-xl mt-6">
          <h3 className="text-lg font-semibold mb-2">🧾 Billing History</h3>
          {billing.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Date</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Method</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {billing.map((invoice: any) => (
                  <tr key={invoice.id} className="border-t">
                    <td className="py-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                    <td className="py-2">₹{invoice.amount}</td>
                    <td className="py-2">{invoice.method}</td>
                    <td className="py-2">{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No billing history found.</p>
          )}
        </div>

        {/* 🧾 Recent Invoices */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-2">🧾 Recent Invoices</h2>
          {invoices.length === 0 ? (
            <p>No invoices yet.</p>
          ) : (
            <ul className="space-y-2">
              {invoices.map((inv) => (
                <li key={inv.id} className="border-b pb-2">
                  <p>Amount: ₹{inv.amount}</p>
                  <p>Status: {inv.status}</p>
                  <p>Date: {new Date(inv.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
