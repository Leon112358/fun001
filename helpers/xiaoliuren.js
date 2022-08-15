const lunar = require("chinese-lunar-calendar");
const map = {
    0:"大安",
    1:"留连",
    2:"速喜",
    3:"赤口",
    4:"小吉",
    5:"空亡"
};

// the function takes in a count
// it counts in the cycle of 6 indexes
// the indexes start with 0
function count(count) {
    var r = count % 6;
    return r == 0 ? 5 : r - 1;
}

// use the hours to indicate the Shichen
// and we have 12 Shichens in China
// the indexes of Shichens starts with 1
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

// gets the Chinese lunar time given a date
function getLunarTime(date) {
    // get PST time. TODO(leon) when we pass in the browser time in the future, 
    // we will not need to create the PST time anymore.
    var pstString = date.toLocaleString(
        'en-US', {
        timeZone: 'America/Los_Angeles',
    });
    console.log("we get PST time: " + pstString);
    date = new Date(pstString);

    return {
        date, 
        lunarDate: lunar.getLunar(
            date.getFullYear(), 
            date.getMonth() + 1 /*the functions takes month from 1 to 12 while date returns 0 to 11*/, 
            date.getDate())};
}

module.exports = {count, getShiChen, map, getLunarTime};