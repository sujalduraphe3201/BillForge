import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import BillingHistory from "./pages/BillingHistory";
import Usage from "./pages/Usage";
import ActivityLog from "./pages/ActivityLog";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/billing-history" element={<BillingHistory />} />
      <Route path="/activity" element={<ActivityLog/>} />
      <Route path="/usage" element={<Usage />} />
    </Routes>
  );
}

export default App;
