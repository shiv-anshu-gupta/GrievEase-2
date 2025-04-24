// components/ComplaintCardGrid.jsx

import React from "react";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const ComplaintCardGrid = ({
  complaints = [],
  title = "Complaints",
  showCount = true,
  actionComponent = null, // Callback that returns JSX based on complaint
}) => {
  const getCardColor = (count) => {
    if (count >= 10) return "bg-orange-100";
    if (count >= 5) return "bg-yellow-100";
    return "bg-white";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className={`${getCardColor(
                complaint.count || 0
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
              <p className="text-sm text-gray-500 mb-1">
                📍 {complaint.address}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Urgency: {complaint.urgency}
              </p>

              <div className="flex items-center justify-between">
                {showCount && (
                  <span className="text-xs text-gray-600">
                    👍 {complaint.count}
                  </span>
                )}
                {actionComponent && <div>{actionComponent(complaint)}</div>}
              </div>
            </div>
          ))
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintCardGrid;
