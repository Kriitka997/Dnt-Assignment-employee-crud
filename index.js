const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
require("./utils/db");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// path for storing Employee Profile Picture
app.use('/images', express.static(__dirname + '/images'));

app.use("/", route);

app.listen(8000, () => {
    console.log("server running...");
});