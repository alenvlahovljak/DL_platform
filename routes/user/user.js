const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../models/User");

//********   USER   **********/

//CREATE route
router.get("/user/new", (req, res)=>{
    res.render("user/new");
});

//SHOW route
router.get("/user/:id", (req, res)=>{
    res.render("user/show");
});

module.exports = router;
