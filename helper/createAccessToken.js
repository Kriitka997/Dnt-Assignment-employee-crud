const jwt = require("jsonwebtoken");
const isTokenExit = require("../services/employee-service");
const createToken = require("./userToken");

// for creating access token after expire access token
exports.AccessTokenCreate = async (req, res) => {
    const tokenResponse = await isTokenExit.getRefreshToken(req.params.id);
    if (tokenResponse) {
        jwt.verify(tokenResponse.refreshToken, 'Refresh', (err, employee) => {
            if (err) {
                res.send({
                    error: err
                })
            }
            else {
                const accessToken = createToken.createAccessToken(employee.ID);
                res.status(200).cookie('token', accessToken)
                    .send({
                        message: "re genrated access token",
                        token: accessToken
                    })
            }
        })
    }
}