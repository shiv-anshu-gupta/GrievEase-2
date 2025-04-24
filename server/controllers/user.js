import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Normalize file path if file exists
    const profilePicPath = req.file
      ? path.join("/uploads", req.file.filename).replace(/\\/g, "/")
      : "";

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      role,
      profilePic: profilePicPath,
    });

    // Save user to DB
    await newUser.save();

    // Create JWT token for verification
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    newUser.verifyToken = token;
    await newUser.save(); // Save again with token

    // Prepare email verification link
    const verificationLink = `${serverUrl}/api/users/verify-email?token=${token}`;

    // Render email template
    const templatePath = path.join(__dirname, "../views/verifyEmail.ejs");
    const emailBody = await ejs.renderFile(templatePath, {
      name: fullName,
      verificationLink,
    });

    // Send verification email
    await sendVerificationEmail(
      newUser.email,
      "Verify Your Email - GrievEase",
      emailBody
    );

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in cookies
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: false, // true only for HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.status === "verified") {
      return res.send("Your email is already verified.");
    }

    user.status = "verified";
    await user.save();

    res.send("Email verification successful. You can now login.");
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid or expired token");
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -verifyToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User profile fetched successfully:", user);
    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, phone, address, email, profilePic } = req.body;

    // Create an update object to hold the fields that are provided
    const updatedFields = {};

    // Dynamically add fields to the update object
    if (username) updatedFields.username = username;
    if (phone) updatedFields.phone = phone;
    if (address) updatedFields.address = address;
    if (email) updatedFields.email = email;
    if (profilePic) updatedFields.profilePic = profilePic;

    // Assuming you have a User model, find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      {
        new: true, // return the updated document
        runValidators: true, // run validation
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const resendVerificationEmail = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you're using auth middleware that adds req.user

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status === "verified") {
      return res.status(400).json({ message: "User already verified" });
    }

    // Generate a fresh token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.verifyToken = token;
    await user.save();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(__dirname, "../views/verifyEmail.ejs");

    const emailBody = await ejs.renderFile(templatePath, {
      name: user.fullName,
      verificationLink: `${serverUrl}/api/users/verify-email?token=${token}`,
    });

    await sendVerificationEmail(
      user.email,
      "Verify Your Email - GrievEase",
      emailBody
    );

    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (err) {
    console.error("Resend Verification Email Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
