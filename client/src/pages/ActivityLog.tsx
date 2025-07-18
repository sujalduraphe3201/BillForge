import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navbar } from "../components/Navbar";

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get("/admin/activity").then(res => setLogs(res.data));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Activity Log</h1>
                <ul className="space-y-4">
                    {logs.map((log: any) => (
                        <li key={log.id} className="bg-white p-4 shadow rounded">
                            <p className="font-semibold">{log.user.name} ({log.user.email})</p>
                            <p>{log.action} – <span className="text-gray-500">{log.details}</span></p>
                            <p className="text-sm text-gray-500">{ new Date(log.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ActivityLog;
