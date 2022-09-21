// Controller functions that deal with the req and res.
const {count, getShiChen, map, getLunarTime} = require("../helpers/xiaoliuren");
const {Xiaoliuren, _} = require("../db/xiaoliuren");

const redirect_leon =  (req, res) => {
    console.log("leon is calling.");
    res.redirect(307, "/requester");
};

const tell_xiaoliuren =  (req, res) =>{
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
};

module.exports = {redirect_leon, tell_xiaoliuren};