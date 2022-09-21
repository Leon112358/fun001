const {redirect_leon, tell_xiaoliuren} = require("../controllers/xiaoliuren");

//creates the router
const express = require("express");
const router = express.Router();

router.post("/leon", redirect_leon)
router.post("/requester", tell_xiaoliuren);

module.exports = router;