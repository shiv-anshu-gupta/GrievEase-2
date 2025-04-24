import express from "express";
import { verifyUser } from "../middleware/verifyAuth.js";
import upload from "../middleware/upload.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  getUserProfile,
  updateUser,
  resendVerificationEmail,
} from "../controllers/user.js";
const router = express.Router();
// Register user with image upload
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/verify-user", verifyUser, async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
router.post("/logout", logoutUser);
router.get("/", (req, res) => {
  res.send("Welcome to the User Routes!");
});
router.get("/verify-email", verifyEmail);
router.get("/profile", getUserProfile);
router.put("/update", verifyUser, updateUser);
router.get("/resend-verification", verifyUser, resendVerificationEmail);
export default router;
