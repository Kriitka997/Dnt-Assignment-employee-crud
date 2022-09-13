const Employee = require("../model/employee");

exports.createEmploye = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.email;
    const phoneNumber = req.body.number
    if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(emailId)) {
        Employee.findOne({ emailId: emailId }).exec((err, userEmail) => {
            if (userEmail) {
                return res.status(401).send({ status: "error", message: "User is already exits with this email address", error: err })
            }
            if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phoneNumber)) {
                const employeeData = new Employee({
                    firstName: firstName,
                    lastName: lastName,
                    emailId: emailId,
                    phoneNumber: phoneNumber
                });
                employeeData.save()
                    .then(result => {
                        res.send({
                            message: "Employees Added.."
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
            else {
                res.send({
                    message: "Phone number is not valid re-enter again!"
                })
            }
        });
    }
    else {
        res.status(513).send({
            message: "email address is not valid please re-enter again!"
        })
    }
}

exports.getAll = async (req, res, next) => {
    let countOfEmployee = await Employee.count();
    let { page, limit } = req.query

    await Employee.find()
        .skip((page - 1) * limit).limit(limit * 1)
        .exec((err, result) => {
            if (err) {
                return res.send("data is not there");
            }
            else {
                return res.status(200).send({
                    data: result,
                    postCount: countOfEmployee
                });
            };
        });
}

exports.getById = (req, res, next) => {
    Employee.findById({ _id: req.params.id })
        .then(result => {
            res.send({
                message: "Founded user by Id",
                result: result
            })
        })
        .catch(err => {
            res.send({
                message: "error",
                error: err.message
            })
        })
}

exports.updateEmployee = (req, res, next) => {
    Employee.findById({ _id: req.params.id })
        .then(result => {
            if (result) {
                if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(req.body.email)) {
                    Employee.findOne({ emailId: req.body.email }).exec((err, email) => {
                        if (email) {
                            return res.status(401).send({ status: "error", message: "User is already exits with this email address", error: err })
                        }
                        if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.number)) {
                            result.firstName = req.body.firstName;
                            result.lastName = req.body.lastName;
                            result.emailId = req.body.email;
                            result.phoneNumber = req.body.number;
                            result.save();
                            res.status(200).send({
                                message: "Employee Details Updated!"
                            })
                        }
                        else {
                            res.send({
                                message: "Phone number is not valid re-enter again!"
                            })
                        }
                    })
                }
                else {
                    res.status(513).send({
                        message: "email address is not valid please re-enter again!"
                    })
                }
            }
            else {
                res.send({
                    message: "User not Founded by This Id",
                    result: result
                })
            }
        })
        .catch(err => {
            res.send({
                message: "error",
                error: err.message
            })
        })
}

exports.deleteEmployee = (req, res, next) => {
    Employee.findByIdAndRemove({ _id: req.params.id })
        .then(result => {
            res.send({
                message: "Employee Deleted",
                result: result
            })
        })
        .catch(err => {
            res.send({
                message: "error",
                error: err.message
            })
        })
}