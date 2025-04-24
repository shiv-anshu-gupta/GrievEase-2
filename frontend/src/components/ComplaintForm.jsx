import { useState, useEffect, useRef } from "react";
import LocationMap from "@/lib/LocationMap"; // adjust path if needed
import axios from "axios";
import ComplaintType from "./ComplaintType";
import { complaintSubmit } from "../api/complaint/complaintConfig";
const ComplaintForm = () => {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category,
    description: "",
    urgency: "",
    date: "",
    latitude: null,
    longitude: null,
    address: "",
    image: null,
  });
  useEffect(() => {
    setFormData((prev) => ({ ...prev, category }));
  }, [category]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await fetchAddress(latitude, longitude);
        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
          address,
        }));
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const result = response.data.results[0];
      return result ? result.formatted_address : "Address not found";
    } catch (err) {
      console.error("Error fetching address:", err);
      return "Address not found";
    }
  };

  const handleLocationChange = ({ latitude, longitude }) => {
    fetchAddress(latitude, longitude).then((address) => {
      setFormData((prev) => ({
        ...prev,
        latitude,
        longitude,
        address,
      }));
    });
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await complaintSubmit(data);
      alert("Complaint submitted successfully!");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Failed to submit complaint.");
    }
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await fetchAddress(latitude, longitude);
        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
          address,
        }));
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Submit a Complaint</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <ComplaintType setCategory={setCategory} />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select urgency</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <LocationMap
          latitude={formData.latitude}
          longitude={formData.longitude}
          onLocationChange={handleLocationChange}
        />

        {formData.address && (
          <p className="text-sm text-gray-700">
            📍 Address: {formData.address}
          </p>
        )}

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
        >
          Get Current Location
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
