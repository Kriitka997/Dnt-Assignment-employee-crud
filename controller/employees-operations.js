const EmployeeService = require("../services/employee-service")
const { responses, error_messages } = require("../utils/constants");

// create employee account
exports.createEmploye = async (req, res, next) => {
    const employeeData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.email,
        profilePictrue: req.file.path,
        phoneNumber: req.body.number,
        password: req.body.password
    };
    employeeData["password"] = req.hashPassword;
    const data = await EmployeeService.createEmployee(employeeData);
    if (data) {
        return res
            .send({
                message: responses.succeeded,
                meta_data: data
            });
    }
    else {
        return res
            .send({
                error: error_messages.not_done
            })
    }
}

// get all employees details
exports.getListOfAllEmployees = async (req, res, next) => {
    let { page, limit } = req.query
    const employeeList = await EmployeeService.getAllEmployees(page, limit);
    if (employeeList) {
        return res.send({
            message: responses.AllEmployeeList,
            meta_data: employeeList
        })
    }
    else {
        return res.send({
            error: error_messages.not_done
        })
    }
}

//get user by specific employee id
exports.getEmployeeById = async (req, res, next) => {
    const EmployeeById = await EmployeeService.employeeById(req.employee.ID);
    console.log(EmployeeById)
    if (EmployeeById["_id"] == req.params.id) {
        return res.send({
            message: responses.Employee,
            meta_data: EmployeeById
        })
    }
    else {
        return res.send({
            error: error_messages.un_authorized
        })
    }
}

//update employee data
exports.updateEmployee = async (req, res) => {
    const employeeAuthData = await EmployeeService.employeeById(req.employee.ID);
    if (employeeAuthData["_id"] == req.params.id) {
        employeeAuthData.firstName = req.body.firstName;
        employeeAuthData.lastName = req.body.lastName;
        employeeAuthData.emailId = req.body.email;
        employeeAuthData.profilePictrue = req.file.path;
        employeeAuthData.phoneNumber = req.body.number;
        const UpdateEmployee = await EmployeeService.EditEmployee(employeeAuthData)
        if (UpdateEmployee) {
            return res.send({
                message: responses.succeeded,
                meta_data: UpdateEmployee
            })
        }
        else {
            return res.send({
                error: error_messages.not_done
            })
        }
    }
    else {
        return res.send({
            error: error_messages.un_authorized
        })
    }
}

// delete employee by using Specific Employee Id.
exports.deleteEmployee = async (req, res) => {
    const employeeAuth = await EmployeeService.employeeById(req.employee.ID);
    if (employeeAuth["_id"] == req.params.id) {
        const deleteEmployee = await EmployeeService.deleteEmployeeById(req.params.id);
        if (deleteEmployee) {
            return res.send({
                message: responses.deleted
            })
        }
        else {
            return res.send({
                error: error_messages.not_done
            })
        }
    }
    else {
        return res.send({
            error: error_messages.un_authorized
        })
    }
}
