import { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import { IoMdNotifications, IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function OSidebar() {
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
            icon={<FaHome />}
            label="Home"
            isOpen={isOpen}
            onClick={() => navigate("/dashboard/home")}
          />
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            isOpen={isOpen}
            onClick={() => navigate("/officer/profile")}
          />
          <SidebarItem
            icon={<IoMdDoneAll />}
            label="Active"
            isOpen={isOpen}
            onClick={() => navigate("/officer/assigned")}
          />
          <SidebarItem
            icon={<IoMdNotifications />}
            label="Pending"
            isOpen={isOpen}
            onClick={() => navigate("/officer/pending")}
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
