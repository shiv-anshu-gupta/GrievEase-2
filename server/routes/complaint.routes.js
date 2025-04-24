import express from "express";
import { verifyUser } from "../middleware/verifyAuth.js";
import upload from "../middleware/upload.js";
import {
  myComplaints,
  createComplaint,
  getAllComplaints,
  likeComplaint,
  unlikeComplaint,
  getPendingComplaints,
  acceptComplaint,
  getAssignedComplaints,
} from "../controllers/complaint.js";

const router = express.Router();

router.post("/submit", verifyUser, upload.single("image"), createComplaint);
router.get("/all", getAllComplaints);
router.post("/:id/like", likeComplaint);
router.post("/:id/unlike", unlikeComplaint);
router.get("/pending", verifyUser, getPendingComplaints);
router.patch("/:complaintId/accept", verifyUser, acceptComplaint);
router.get("/my", verifyUser, myComplaints);
router.get("/assigned", verifyUser, getAssignedComplaints);

export default router;
