import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path, { dirname } from "path"; // <-- Import dirname here
import { fileURLToPath } from "url";

// Routes
import userRoutes from "./routes/user.routes.js";
import mapRoutes from "./routes/map.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";

// Socket Handler
import { chatSocketHandler } from "./sockets/chat.socket.js";
// Setup
dotenv.config();
const frontendUrl = process.env.frontendUrl;
const app = express();
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // <-- This should work now

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Assuming views folder is in root

// Routes
app.use("/api/users", userRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/complaint", complaintRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome to GrievEase Backend");
});

// Socket.IO Chat Handler
chatSocketHandler(io);

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));
