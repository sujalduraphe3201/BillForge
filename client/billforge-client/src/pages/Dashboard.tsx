import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  tenantId: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <p className="text-gray-600">Tenant ID: {user.tenantId}</p>
    </div>
  );
};

export default Dashboard;
