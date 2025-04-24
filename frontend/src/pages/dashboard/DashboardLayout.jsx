import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed to the left */}
      <div className="w-64 fixed top-0 left-0 bottom-0 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content - takes the rest of the screen and scrolls independently */}
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
