const multer = require("multer");
const path = require("path");
const Employee = require("../models/employee.model");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage: storage });

const createEmployee = async (req, res) => {
  try {
    const { name, email, mobNum, designation, gender, course } = req.body;

    // Handle image file
    const img = req.file ? req.file.path : null; // Get image path from the multer upload

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Assuming `course` is coming as a JSON string (from frontend FormData)
    const courseArray = JSON.parse(course);

    const newEmployee = await Employee.create({
      name,
      email,
      mobNum,
      designation,
      gender,
      course: courseArray, // Store as array
      img, // Store image path
    });

    res.json({
      message: "Employee created successfully",
      status: "SUCCESS",
      data: newEmployee, // Optionally, you can send back the newly created employee
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// You may need to use the same `upload` middleware in other routes if you want to allow updating employee images
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobNum, designation, gender, course } = req.body;
    const img = req.file ? req.file.path : null; // Get new image path from the multer upload, if any

    const updatedData = {
      name,
      email,
      mobNum,
      designation,
      gender,
      course: JSON.parse(course), // Make sure course is an array
      img, // Include img if it's updated
    };

    await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({
      status: "Success",
      message: "Employee updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const users = await Employee.find();
    res.json({
      status: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({
      status: "SUCCESS",
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
