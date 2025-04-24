// src/pages/LoginPage.jsx
import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // make sure this path is correct
const serverUrl = import.meta.env.VITE_SERVER_URL;
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${serverUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); // set user in context
        data.user.role === "citizen"
          ? navigate("/dashboard")
          : navigate("/officer");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          GrievEase Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <p className="text-red-600 text-center text-sm">{errorMsg}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="text-center text-sm mt-2">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
