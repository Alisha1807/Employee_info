const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobNum: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      enum: ["HR", "Manager", "Sales"],
      required: true, 
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true, 
    },
    course: {
      type: [String], 
      required: true, 
    },
    img: {
      type: String,
      required: false, 
    },
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;

