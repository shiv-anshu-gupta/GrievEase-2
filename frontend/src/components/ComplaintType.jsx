import React from "react";

const types = [
  "Garbage",
  "Road & Footpath",
  "Public Toilets / Urinals",
  "Street Lights",
  "Water Supply",
  "Drainage",
  "Parks & Gardens",
  "Public Health",
  "Building Construction",
  "Other",
];

const ComplaintType = ({ setCategory }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {types.map((type, i) => (
        <div
          key={i}
          className="flex items-center gap-2 p-2 border rounded shadow-sm"
        >
          <input
            type="radio"
            id={type}
            name="complaintType"
            value={type}
            className="cursor-pointer"
            onChange={() => setCategory(type)}
          />
          <label htmlFor={type} className="cursor-pointer">
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ComplaintType;
