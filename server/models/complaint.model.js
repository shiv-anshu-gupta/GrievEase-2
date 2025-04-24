import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    description: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },

    // ✅ New Fields
    officerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
