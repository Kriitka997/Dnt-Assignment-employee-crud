const EmployeeService = require("../services/employee-service");
const tokenCreate = require("../helper/userToken");
const { responses, error_messages } = require("../utils/constants");

// login api for verify the employee for giving permission to perform crud.
exports.employeeLogin = async (req, res) => {
    if (req.validatePass) {
        const userData = await EmployeeService.loginUser(req.body.email);
        if (userData) {
            const accessToken = await tokenCreate.createAccessToken(userData["_id"]);
            const refreshToken = await tokenCreate.createRefreshToken(userData["_id"])
            if (accessToken && refreshToken) {
                const refreshTok = {
                    EmployeeID: userData["_id"],
                    refreshToken: refreshToken
                }
                EmployeeService.refreshToken(refreshTok)
                return res.
                    cookie("token", accessToken)
                    .send({
                        message: responses.succeeded,
                        token: accessToken,
                    });
            }
            else {
                return res.send({
                    error: "token not created"
                })
            }
        }
        else {
            return res.send({
                error: error_messages.not_exist
            })
        }
    }
    else {
        return res.send({
            message: error_messages.wrong_pass
        })
    }
}
