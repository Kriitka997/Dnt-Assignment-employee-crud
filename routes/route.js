const express = require("express");
let route = express.Router();
const employeeLogin = require("../controller/employee-login");
const employeController = require("../controller/employees-operations");
const multerFile = require("../middleware/profile-picture-multer");
const { hashPassword, comparepass } = require("../middleware/employeePassword");
const { employeeSchemaValidation } = require("../middleware/schema-verification");
const authFile = require("../middleware/auth");
const refreshToken = require("../helper/createAccessToken");

// create employee route
route.post("/add-employee", multerFile.single('image'), employeeSchemaValidation,
    hashPassword, employeController.createEmploye);

// login 
route.post("/login-employee", comparepass, employeeLogin.employeeLogin);

// update the employee data
route.put("/update-employee/:id", authFile, multerFile.single('image'), employeeSchemaValidation, employeController.updateEmployee);

// get all employees by this route
route.get("/", employeController.getListOfAllEmployees);

// employee getting by specific employee ID
route.get("/get-employee/:id", authFile, employeController.getEmployeeById);

// delete the employee by using id
route.delete("/delete-employee/:id", authFile, employeController.deleteEmployee);

route.post('/access-token/:id',refreshToken.AccessTokenCreate);

module.exports = route;