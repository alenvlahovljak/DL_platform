//Modules config
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Mongoose models config
const User = require("../../models/User");

//********   USER   **********/

//NEW route
router.get("/user/new", (req, res)=>{
    res.render("user/new");
});

//CREATE route
router.post("/user", (req, res)=>{
    res.send(req.body);
});

//SHOW route
router.get("/user/:id", (req, res)=>{
    res.render("user/show");
});

module.exports = router;
