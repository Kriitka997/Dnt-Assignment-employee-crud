const mongo = require("mongoose");

const refreshToken = mongo.Schema({
    EmployeeID: {
        type: mongo.Schema.Types.ObjectId, ref: 'employees',
    },
    refreshToken: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongo.model("refresh-token", refreshToken);