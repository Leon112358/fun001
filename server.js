const express = require("express");
const lunar = require("chinese-lunar-calendar");
const map = {
    0:"大安",
    1:"留连",
    2:"速喜",
    3:"赤口",
    4:"小吉",
    5:"空亡"
};

// create an express app.
const app = express();
const config = {root: __dirname};

// listen to requests on port 8080.
app.listen(8080);

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
    res.send("<h1>" + map[index] + "</h1>");
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
// THIS HAS TO BE IN THE LAST LINE!
app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", config);
});