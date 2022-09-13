const express = require("express");
const employeController = require("../controller/employees");

let route = express.Router();

route.post("/add-employee", employeController.createEmploye);
route.get("/", employeController.getAll);
route.get("/get/:id", employeController.getById);
route.put("/update-employee/:id", employeController.updateEmployee);
route.delete("/delete-employee/:id",employeController.deleteEmployee)

module.exports = route;