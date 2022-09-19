const Employee = require("../model/employee");
const { error_messages } = require("../utils/constants");

//Employee data Email and Phone number verifing .
exports.employeeSchemaValidation = (req, res, next) => {
    if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(req.body.email)) {
        Employee.findOne({ emailId: req.body.email }).exec((err, userEmail) => {
            if (userEmail) {
                return res.send({ error: error_messages.al_exist, error: err })
            }
            if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.number)) {

                next()
            }
            else {
                return res.send({
                    error: error_messages.numberNotValid
                });
            }
        });
    }
    else {
        return res.send({
            error: error_messages.emailRequired
        });
    }
}