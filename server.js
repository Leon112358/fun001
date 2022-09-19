// classes
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {_, dbUrl} = require("./db/xiaoliuren");
const xiaoliurenRoutes = require("./routes/xiaoliuren");

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
    res.status(200).sendFile("./views/index.html", config);
})

// register the routers
// we can use app.use(<uri>, <router>) to further scope the routings
app.use(xiaoliurenRoutes);

// unknow uris?
app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", config);
});