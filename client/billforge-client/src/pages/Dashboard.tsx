import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect((): any => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
      <p className="text-gray-600">Tenant ID: {user?.tenantId}</p>
    </div>
  );
};

export default Dashboard;
