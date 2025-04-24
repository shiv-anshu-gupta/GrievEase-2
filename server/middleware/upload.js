import multer from "multer";
import fs from "fs";
import path from "path";

// Explicitly resolve the absolute path for the uploads directory
const uploadPath = path.join(path.resolve(), "public", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
