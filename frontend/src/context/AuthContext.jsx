// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const serverUrl = import.meta.env.VITE_SERVER_URL;
export const AuthProvider = ({ children }) => {
  // ✅ children should be lowercase
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const verifyUser = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/users/verify-user`, {
        method: "GET",
        credentials: "include", // send cookies
      });
      const data = await res.json();

      console.log("User data:", data); // Log the response here

      if (res.ok) {
        setUser(data.user); // Ensure 'data.user' contains the fullName field
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Verify failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
