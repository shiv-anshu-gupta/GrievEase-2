import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/auth/userConfig";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext); // Access user and loading from context
  console.log("User in Navbar:", user); // Debugging line to check user state
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 tracking-wide cursor-pointer"
          >
            Griev<span className="text-indigo-600">Ease</span>
          </Link>
          <div>Loading...</div>{" "}
          {/* You can replace this with a spinner or some other loading indicator */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 tracking-wide cursor-pointer"
        >
          Griev<span className="text-indigo-600">Ease</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#how-it-works" className="hover:text-blue-600 transition">
            How It Works
          </a>

          <a href="/complaintsPage" className="hover:text-blue-600 transition">
            Contribute
          </a>

          {/* Conditional Render for User Name or Login/Register */}
          {user ? (
            <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-md">
              <Link
                to={
                  user?.role?.toLowerCase() === "officer"
                    ? "/officer/profile"
                    : "/dashboard/profile"
                }
              >
                <span className="text-gray-700 font-semibold text-lg">
                  {user.fullName}
                </span>
              </Link>
              <button
                className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#how-it-works" className="hover:text-blue-600">
              How It Works
            </a>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>

            {/* Mobile Conditional Render */}
            {user ? (
              <div className="flex flex-col gap-4 bg-gray-100 p-2 rounded-md shadow-md">
                <span className="text-gray-700 font-semibold text-lg">
                  {user.fullName}
                </span>
                <button
                  className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition">
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
