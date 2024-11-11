const express = require("express");

const router = express.Router();

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employee.controller.js");

router.get("/employee", getEmployees);

router.post("/employee", createEmployee);

router.put("/employee/:id", updateEmployee);

router.delete("/employee/:id", deleteEmployee);

module.exports = router;

//!VERY IMPPPPP
//~REMEMBER
// no app refernce here => express has a Router method-> creates router,
//connect it to express application(index)

//ROutes need access to the controllers
