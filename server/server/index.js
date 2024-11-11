const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");

//! Importing routes
const userRoutes = require("./src/routes/employee.routes");

//! Load environment variables
dotenv.config();

const app = express();

//! Middleware
app.use(cors());
app.use(express.json()); // Important middleware for JSON parsing

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure 'uploads' folder exists in your root directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Create a unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

//! Routes
app.use("/api/employeeDetails", upload.single("img"), userRoutes);

app.get("/", (req, res) => {
  res.send({
    status: "Server is up",
    now: new Date(),
  });
});

//! Connect to MongoDB and start the server
app.listen(process.env.PORT, () => {
  console.log("Starting server...");
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Server is running");
    })
    .catch((error) => console.log("MongoDB connection error: ", error));
});
