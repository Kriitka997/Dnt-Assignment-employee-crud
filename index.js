const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./routes/route");

let app = express();

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route)

mongoose.connect('mongodb+srv://kritika:kritika@cluster0.ysgo71k.mongodb.net/employees?retryWrites=true&w=majority').then(() => {
    console.log("connected")
    app.listen(8000)
})
    .catch(err => {
        console.log(err.message)
    })
