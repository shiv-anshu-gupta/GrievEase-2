import React, { useState, useEffect } from "react";
import { BadgeCheck, ShieldAlert, Loader2, Pencil } from "lucide-react";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editableFields, setEditableFields] = useState({
    username: "",
    phone: "",
    address: "",
  });
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${serverUrl}/api/users/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.log("Profile not found");
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Profile data:", data); // Log the response here
        setUser(data.user);
        setEditableFields({
          username: data.user.username || "",
          phone: data.user.phone || "",
          address: data.user.address || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFieldClick = (field) => {
    if (editMode) setEditingField(field);
  };

  const handleFieldChange = (e) => {
    setEditableFields({ ...editableFields, [editingField]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: editableFields.username,
          phone: editableFields.phone,
          address: editableFields.address,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => ({
          ...prev,
          ...editableFields,
        }));
        alert("Profile updated successfully!");
        setEditMode(false);
        setEditingField(null);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl font-semibold">
        User profile not found.
      </div>
    );
  }

  const isVerified = user.status === "verified";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
        My Profile
      </h1>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-8 transition-all duration-300">
        {/* Left - Profile Pic and Basic Info */}
        <div className="flex flex-col items-center sm:items-start sm:w-1/3 gap-4">
          <img
            src={user.profilePic ? `${user.profilePic}` : "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-800">
              {user.fullName}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-600 capitalize mt-1">
              Role: {user.role}
            </p>

            <div className="mt-2">
              {isVerified ? (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `${serverUrl}/api/users/resend-verification`,
                        {
                          method: "GET",
                          credentials: "include",
                        }
                      );
                      const data = await res.json();
                      if (res.ok) {
                        alert(
                          "Verification email sent. Please check your inbox."
                        );
                      } else {
                        alert(
                          data.message || "Failed to send verification email."
                        );
                      }
                    } catch (err) {
                      console.error("Resend error:", err);
                      alert(
                        "Something went wrong while sending verification email."
                      );
                    }
                  }}
                  className="flex items-center gap-2 text-red-600 text-sm mt-1 hover:underline"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Unverified (Click to Verify)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right - Editable Fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["username", "phone", "address"].map((field) => (
            <div key={field} className="space-y-1">
              <p className="text-sm text-gray-500 capitalize">{field}</p>
              {editingField === field ? (
                <input
                  value={editableFields[field]}
                  onChange={handleFieldChange}
                  onBlur={() => setEditingField(null)}
                  className="w-full border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <p
                  className="text-base font-medium cursor-pointer flex items-center gap-1 group"
                  onClick={() => handleFieldClick(field)}
                >
                  {editableFields[field] || "N/A"}
                  {editMode && (
                    <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  )}
                </p>
              )}
            </div>
          ))}

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Joined On</p>
            <p className="text-base font-semibold">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="col-span-full mt-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleUpdateProfile}
                className="px-5 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md shadow"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
