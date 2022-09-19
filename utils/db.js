const mongoose = require("mongoose");

//mongoose connection
mongoose.connect('mongodb+srv://kritika:kritika@cluster0.ysgo71k.mongodb.net/employees?retryWrites=true&w=majority').then(() => {
    console.log("connected")
})
    .catch(err => {
        console.log(err.message)
    })
