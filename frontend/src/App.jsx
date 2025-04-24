import { useState } from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintsPage from "./pages/complaintsPage";
import Layout from "../Layout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ProfilePage from "./pages/dashboard/Profile";
import Profile from "./pages/officer/Profile";
import OfficerLayout from "./pages/officer/OfficerLayout";

import MyComplaintsPage from "./pages/dashboard/MyComplaints";
import NewComplaints from "./pages/officer/NewComplaints";
import Assigned from "./pages/officer/Assigned";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* Layout routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="report" element={<ComplaintForm />} />
        <Route path="complaintsPage" element={<ComplaintsPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index path="profile" element={<ProfilePage />} />

          <Route path="complaints" element={<MyComplaintsPage />} />
        </Route>
        <Route path="/officer" element={<OfficerLayout />}>
          <Route index path="profile" element={<Profile />} />
          <Route path="assigned" element={<Assigned />} />
          <Route path="pending" element={<NewComplaints />} />
        </Route>
      </Route>

      {/* Auth routes outside of Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
