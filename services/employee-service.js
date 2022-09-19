const employeeModel = require("../model/employee");
const Refresh_Token = require("../model/refreshToken");

exports.createEmployee = (data) => {
    return employeeModel.create(data);
}

exports.loginUser = (email) => {
    return employeeModel.findOne({ emailId: email });
}

exports.getAllEmployees = async (page, limit) => {
    return employeeModel.find().skip((page - 1) * limit).limit(limit * 1)
        .exec();
}

exports.employeeById = (employeeId) => {
    return employeeModel.findById({ _id: employeeId })
}

exports.EditEmployee = (employeeUpdateData) => {
    return employeeModel.create(employeeUpdateData);
}

exports.deleteEmployeeById = (employee) => {
    return employeeModel.findByIdAndRemove({ _id: employee })
}

exports.refreshToken = (TokenWithId) => {
    return Refresh_Token.create(TokenWithId)
}

exports.getRefreshToken = (id) => {
    return Refresh_Token.findOne({ EmployeeID: id })
}