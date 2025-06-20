import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setUser(res.data);

        const sub = await axios.get("http://localhost:5000/api/subscribe/subscription");
        setSubscription(sub.data[0]);
      } catch {
        navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* 👤 User Info */}
        <div className="bg-white shadow-md p-5 rounded-xl">
          <h2 className="text-xl font-semibold">👋 Welcome, {user?.name}</h2>
          <p className="text-gray-600">Tenant ID: {user?.tenantId}</p>
        </div>

        {/* 💳 Current Plan */}
        <div className="bg-white shadow-md p-5 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">💳 Subscription</h3>
          {subscription ? (
            <>
              <p>Plan: <span className="font-medium">{subscription.plan.name}</span></p>
              <p>Status: <span className="capitalize">{subscription.status}</span></p>
              <p>Start Date: {new Date(subscription.startDate).toLocaleDateString()}</p>
              {subscription.endDate && (
                <p>End Date: {new Date(subscription.endDate).toLocaleDateString()}</p>
              )}
            </>
          ) : (
            <p>No active subscription</p>
          )}
        </div>

        {/* 🔄 Actions */}
        <div className="flex gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Upgrade Plan</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
