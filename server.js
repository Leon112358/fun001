const config = {root: __dirname};

const express = require("express");
const lunar = require("chinese-lunar-calendar");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Xiaoliuren = require("./db/xiaoliuren");

// create an express app.
const app = express();

// mongodb url.
const dbUrl = "mongodb+srv://tellafortune:z6FmFw1yKmIhRR8b@leon001.hsdpbay.mongodb.net/decisions?retryWrites=true&w=majority";
mongoose.connect(
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

const map = {
    0:"大安",
    1:"留连",
    2:"速喜",
    3:"赤口",
    4:"小吉",
    5:"空亡"
};

// some setups
app.use(morgan("combined"));
app.use(express.static("css"));

// set up uris
app.get("/", (req, res) =>{
    // get PST time.
    var date = new Date();
    var pstString = date.toLocaleString(
        'en-US', {
        timeZone: 'America/Los_Angeles',
    });
    date = new Date(pstString);
     
    // calculates the lunar date.
    var lunarDate = lunar.getLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    var lMonth = lunarDate["lunarMonth"];
    var lDate = lunarDate["lunarDate"];
    console.log(lunarDate);

    // calculate the Xiao Liu Ren index.
    var index = 0;
    console.log("The XiaoShi: " + date.getHours());
    index = count(lMonth + lDate + getShiChen(date.getHours()) - 2);
    console.log("The Xiao Liu Ren idex: " + index);

    // store this attemp!
    new Xiaoliuren({
        result: index,
        lunar_time: lunarDate
    })
    .save()
    .then((result) => {
        console.log(result);
        res.send("<h1>" + map[index] + "</h1>");
    })
    .catch((error) => console.log(error));

    
});

function count(count) {
    var r = count % 6;
    return r == 0 ? 5 : r - 1;
}

function getShiChen(hours) {
    switch(hours) {
        case 0:
        case 23:
            return 1;
        case 1:
        case 2:
            return 2;
        case 3:
        case 4:
            return 3;
        case 6:
        case 6:
            return 4;
        case 7:
        case 8:
            return 5;
        case 9:
        case 10:
            return 6;
        case 11:
        case 12:
            return 7;
        case 13:
        case 14:
            return 8;
        case 15:
        case 16:
            return 9;
        case 17:
        case 18:
            return 10;
        case 19:
        case 20:
            return 11;
        default:
            return 12;
      }
}

// unknow uris?
app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", config);
});