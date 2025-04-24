import express from "express";
import axios from "axios";

const router = express.Router();

// Define the autocomplete route
router.get("/autocomplete", async (req, res) => {
  const { input } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Make sure to use your Google Maps API key here

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    // Google Places API call for autocomplete suggestions
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      // Map predictions to descriptions (locations)
      const suggestions = response.data.predictions.map(
        (prediction) => prediction.description
      );
      res.json(suggestions); // Send suggestions back to the frontend
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch location suggestions" });
  }
});

export default router;
