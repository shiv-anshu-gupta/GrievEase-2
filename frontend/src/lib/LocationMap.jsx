import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const LocationMap = ({ latitude, longitude, onLocationChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isLoaded && latitude && longitude) {
      const center = { lat: latitude, lng: longitude };

      const map = new window.google.maps.Map(
        document.getElementById("map-canvas"),
        {
          center,
          zoom: 15,
        }
      );
      mapRef.current = map;

      const marker = new window.google.maps.Marker({
        position: center,
        map,
      });
      markerRef.current = marker;

      map.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        marker.setPosition({ lat, lng });
        onLocationChange({ latitude: lat, longitude: lng });
      });
    }
  }, [isLoaded, latitude, longitude, onLocationChange]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${serverUrl}/api/map/autocomplete`, {
        params: { input: value },
      });
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    inputRef.current.value = suggestion;
    setSuggestions([]);

    try {
      // Geocode the selected suggestion
      const geoRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: suggestion,
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          },
        }
      );

      const location = geoRes.data.results[0]?.geometry?.location;
      if (location) {
        const pos = { lat: location.lat, lng: location.lng };

        mapRef.current.setCenter(pos);
        markerRef.current.setPosition(pos);
        onLocationChange({ latitude: location.lat, longitude: location.lng });
      }
    } catch (err) {
      console.error("Failed to geocode address:", err);
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        placeholder="Search location"
        className="w-full p-2 border rounded mb-2 z-10"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "calc(100% - 20px)",
          zIndex: 10,
          backgroundColor: "#fff",
        }}
      />

      {suggestions.length > 0 && (
        <ul
          className="absolute z-20 bg-white border w-full max-h-60 overflow-auto"
          style={{ top: 45 }}
        >
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <div id="map-canvas" style={containerStyle}></div>
    </div>
  );
};

export default LocationMap;
