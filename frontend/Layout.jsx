// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
