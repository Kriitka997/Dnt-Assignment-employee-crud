const jwt = require("jsonwebtoken");

// authorization function for verify the Employee
module.exports = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {

        let sliceToken = authToken.slice(13, authToken.length - 9);
        jwt.verify(sliceToken, 'Access', (err, employee) => {
            if (err) {
                res.send({
                    status: 404,
                    error: err
                })
            }
            else {
                req.employee = employee;
                next()
            }
        })
    }
}