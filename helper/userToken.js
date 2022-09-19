const jwt = require("jsonwebtoken");

// creating employee JWT token.
exports.createAccessToken = (employeeId) => {

    let accessToken = jwt.sign({ ID: employeeId }, "Access", {
        expiresIn: "1h"
    });
    return accessToken;
};

exports.createRefreshToken = (employeeId) => {
    let refreshToken = jwt.sign({ ID: employeeId }, "Refresh", {
        expiresIn: "365d"
    });
    return refreshToken
}