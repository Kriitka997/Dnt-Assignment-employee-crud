const bcrypt = require('bcrypt');
const Employee = require("../model/employee");
const { error_messages } = require("../utils/constants");

// hashpassword it is for convert employee password encrypted.
exports.hashPassword = async (req, res, next) => {
    if (req.body.password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})"))) {
        if (req.body.password === req.body.confirm_password) {
            const hashPass = await bcrypt.hash(req.body.password, 12);
            req.hashPassword = hashPass;
            next()
        }
        else {
            return res.send({
                error: error_messages.comparePass
            })
        }
    }
    else {
        return res.send({
            error: error_messages.validPassword
        })
    }
};

// for compare the encrypt password which getting login time
exports.comparepass = async (req, res, next) => {
    const userPassword = await Employee.findOne({ emailId: req.body.email });
    if (userPassword) {
        bcrypt.compare(req.body.password, userPassword["password"], (err, password) => {
            req.validatePass = password;
            next()
        });
    }
    else {
        return res.send({
            error: error_messages.not_exist
        })
    }
};

