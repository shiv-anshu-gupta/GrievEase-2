import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import Complaint from "../models/complaint.model.js";
// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      urgency,
      date,
      latitude,
      longitude,
      address,
    } = req.body;

    let imageUrl = "";

    // Upload to Cloudinary if image exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "grievease_complaints",
      });

      imageUrl = result.secure_url;

      // Optional: delete local file after upload
      fs.unlinkSync(req.file.path);
    }

    const complaint = new Complaint({
      title,
      category,
      description,
      urgency,
      date,
      latitude,
      longitude,
      address,
      image: imageUrl,
      userId: req.user.id, // assuming verifyUser sets this
    });

    await complaint.save();
    res
      .status(201)
      .json({ message: "Complaint created successfully", complaint });
  } catch (err) {
    console.error("Error creating complaint:", err);
    res.status(500).json({ error: "Failed to create complaint" });
  }
};

// Get all complaints (unprotected)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ count: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

// Like a complaint
export const likeComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { $inc: { count: 1 } },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res
      .status(200)
      .json({ message: "Liked complaint", complaint: updatedComplaint });
  } catch (err) {
    console.error("Error liking complaint:", err);
    res.status(500).json({ error: "Failed to like complaint" });
  }
};

// Unlike a complaint
export const unlikeComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.count = Math.max(0, complaint.count - 1);
    await complaint.save();

    res.status(200).json({ message: "Unliked complaint", complaint });
  } catch (err) {
    console.error("Error unliking complaint:", err);
    res.status(500).json({ error: "Failed to unlike complaint" });
  }
};

// My complaints
export const myComplaints = async (req, res) => {
  try {
    const userId = req.user.id;
    const complaints = await Complaint.find({ userId })
      .populate("officerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.log("Error fetching user complaints:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get pending complaints
export const getPendingComplaints = async (req, res) => {
  try {
    const pendingComplaints = await Complaint.find({
      status: "Pending",
    }).populate("userId", "fullName email");

    res.status(200).json({
      success: true,
      message: "Pending complaints fetched successfully",
      data: pendingComplaints,
    });
  } catch (error) {
    console.error("Error fetching pending complaints:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending complaints",
    });
  }
};

// Accept complaint
export const acceptComplaint = async (req, res) => {
  const { complaintId } = req.params;
  const officerId = req.user.id;

  try {
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "In Progress";
    complaint.officerId = officerId;

    await complaint.save();

    res
      .status(200)
      .json({ message: "Complaint is now in progress", data: complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get assigned complaints
export const getAssignedComplaints = async (req, res) => {
  try {
    const officerId = req.user.id;

    const complaints = await Complaint.find({ officerId })
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Assigned complaints fetched successfully",
      data: complaints,
    });
  } catch (error) {
    console.error("Error fetching assigned complaints:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned complaints",
    });
  }
};
