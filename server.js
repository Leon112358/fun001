// classes
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {Xiaoliuren, dbUrl} = require("./db/xiaoliuren");
const url = require('url');   

// functions
const {count, getShiChen, map, getLunarTime} = require("./helpers/xiaoliuren");

// create an express app.
const app = express();
app.use(morgan("combined")); // setup a default logger for in-coming calls
app.use(express.static("css")); // sertup the static file folder
app.use(express.urlencoded());
const config = {root: __dirname}; // configuration

// connects the mongo db and starts the app
mongoose
.connect(
    dbUrl, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
)
.then(() => {
    console.log("Mongo DB connected!");

    // listen to requests on port 8080.
    // only starts the server when db is connected!
    app.listen(8080);
})
.catch((error) => console.log(error));

// set up uris
app.get("/", (req, res) => {
    res.status(404).sendFile("./views/index.html", config);
})

app.post("/leon", (req, res) => {
    console.log("leon is calling.");
    res.redirect(307, "/");
})

app.post("/", (req, res) =>{
    var requester = req.body.requester == undefined ? "leon" : req.body.requester;

    // calculates the lunar date.
    var {date, lunarDate} = getLunarTime(new Date()); 
    var lMonth = lunarDate["lunarMonth"];
    var lDate = lunarDate["lunarDate"];

    // calculate the Xiao Liu Ren index.
    var index = count(lMonth + lDate + getShiChen(date.getHours()) - 2);

    // store this attemp!
    new Xiaoliuren({
        result: index,
        lunar_time: lunarDate,
        requester: requester
    })
    .save()
    .then((result) => {
        console.log(result);
        res.send("<h1>" + map[index] + "</h1>");
    })
    .catch((error) => console.log(error));
});

// unknow uris?
app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", config);
});