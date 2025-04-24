import { useState } from "react";
import { FaHome, FaUser, FaBars } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button onClick={toggleSidebar} className="text-white">
            <FaBars />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            isOpen={isOpen}
            onClick={() => navigate("/dashboard/profile")}
          />
          <SidebarItem
            icon={<TbReportSearch />}
            label="myComplaints"
            isOpen={isOpen}
            onClick={() => navigate("/dashboard/complaints")}
          />
          <SidebarItem
            icon={<TfiWrite />}
            label="Report"
            isOpen={isOpen}
            onClick={() => navigate("/report")}
          />
        </nav>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer transition"
    >
      <div className="text-lg">{icon}</div>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
}
