import React from "react";

const ToggleRoleSwitcher = ({ role, setRole }) => {
  return (
    <div className="flex justify-center mb-6 bg-gray-200 rounded-full p-1">
      <button
        type="button"
        onClick={() => setRole("citizen")}
        className={`w-1/2 py-2 rounded-full transition ${
          role === "citizen"
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-300"
        }`}
      >
        Citizen
      </button>
      <button
        type="button"
        onClick={() => setRole("officer")}
        className={`w-1/2 py-2 rounded-full transition ${
          role === "officer"
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-300"
        }`}
      >
        Officer
      </button>
    </div>
  );
};

export default ToggleRoleSwitcher;
