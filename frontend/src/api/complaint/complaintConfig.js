// complaintApi.js (Frontend)
import { toast } from "react-toastify";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const API_BASE = import.meta.env.VITE_API_URL || `${serverUrl}/api/complaint`;

// Fetch all complaints (public route)
export const getAllComplaints = async () => {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error("Failed to fetch complaints");
  return res.json();
};

// Submit a new complaint (protected route with form data)
export const complaintSubmit = async (formData) => {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    body: formData,
    credentials: "include", // Sends cookies for auth
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to submit complaint");
  }

  return await res.json();
};

// Like a complaint
export const likeComplaint = async (id) => {
  const res = await fetch(`${API_BASE}/${id}/like`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to like complaint");
  return res.json();
};

// Unlike a complaint
export const unlikeComplaint = async (id) => {
  const res = await fetch(`${API_BASE}/${id}/unlike`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to unlike complaint");
  return res.json();
};

// Fetch complaints created by the logged-in user
export const getMyComplaints = async () => {
  const res = await fetch(`${API_BASE}/my`, {
    method: "GET",
    credentials: "include", // Important for sending auth cookie
  });

  if (!res.ok) throw new Error("Failed to fetch your complaints");
  return res.json();
};
export const getAssignedComplaints = async () => {
  const res = await fetch(`${API_BASE}/assigned`, {
    method: "GET",
    credentials: "include", // Important for sending auth cookie
  });

  if (!res.ok) throw new Error("Failed to fetch your complaints");
  console.log("Assigned complaints data:", res); // Log the response here
  return res.json();
};
export const fetchPendingComplaints = async () => {
  try {
    const res = await fetch(`${API_BASE}/pending`, {
      method: "GET",
      credentials: "include", // in case you are using cookies for auth
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("Pending complaints data:", data.data); // Log the response here
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch pending complaints");
    }

    return data.data; // contains the list of complaints
  } catch (error) {
    console.error("Error fetching pending complaints:", error);
    return [];
  }
};

export const acceptComplaint = async (complaintId) => {
  try {
    const response = await fetch(`${API_BASE}/${complaintId}/accept`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication (if needed)
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message); // Show success message
      // Optionally, update the UI here (e.g., reload complaints or mark as accepted)
    } else {
      toast.error(data.message); // Show error message if something went wrong
    }
  } catch (error) {
    console.error("Error accepting complaint:", error);
    toast.error("Something went wrong");
  }
};
