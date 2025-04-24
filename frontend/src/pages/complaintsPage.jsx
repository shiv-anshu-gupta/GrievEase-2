import React, { useEffect, useState } from "react";
import {
  getAllComplaints,
  likeComplaint,
  unlikeComplaint,
} from "../api/complaint/complaintConfig"; // Adjust path if needed
const serverUrl = import.meta.env.VITE_SERVER_URL;
const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      console.log("Fetched complaints:", data); // Check if complaints data is populated
      setComplaints(data || []); // Ensure we are correctly setting complaints data
    } catch (err) {
      console.error("Error fetching complaints:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCardColor = (count) => {
    if (count >= 10) return "bg-orange-100"; // Orange shade for counts 10 or more
    if (count >= 5) return "bg-yellow-100"; // Yellow shade for counts between 5 and 9
    return "bg-white"; // White shade for counts less than 5
  };

  const handleLike = async (id) => {
    try {
      const data = await likeComplaint(id);
      updateComplaintCount(id, data.updatedCount);
    } catch (err) {
      console.error("Error liking complaint:", err.message);
    }
  };

  const handleUnlike = async (id) => {
    try {
      const data = await unlikeComplaint(id);
      updateComplaintCount(id, data.updatedCount);
    } catch (err) {
      console.error("Error unliking complaint:", err.message);
    }
  };

  const updateComplaintCount = (id, count) => {
    setComplaints((prev) =>
      prev.map((c) => (c._id === id ? { ...c, count } : c))
    );
  };

  if (loading) return <div className="p-6">Loading complaints...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Check if complaints exist */}
      {complaints && complaints.length > 0 ? (
        complaints.map((complaint) => (
          <div
            key={complaint._id}
            className={`${getCardColor(
              complaint.count
            )} rounded-2xl shadow-md p-4 border border-gray-200`}
          >
            {complaint.image && (
              <img
                src={`${serverUrl}${complaint.image}`}
                alt={complaint.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
            )}

            <h2 className="text-xl font-semibold mb-2">{complaint.title}</h2>
            <p className="text-gray-600 mb-1">{complaint.description}</p>
            <p className="text-sm text-gray-500 mb-4">📍 {complaint.address}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => handleLike(complaint._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl text-sm"
                >
                  👍 Like
                </button>
                <button
                  onClick={() => handleUnlike(complaint._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
                >
                  👎 Unlike
                </button>
              </div>
              <span className="text-xs text-gray-600">
                👍 {complaint.count}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No complaints available</p>
      )}
    </div>
  );
};

export default ComplaintsPage;
