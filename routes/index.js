//Modules config
const express = require("express");
const router = express.Router();

//Mongoose model config
const User = require("../models/User");

//********   USER   **********//

//NEW route
router.get("/users/new", (req, res)=>{
    res.render("user/new");
});

//CREATE route
router.post("/users", (req, res)=>{
    User.create(req.body.newUser).then((user)=>{
        return res.status(210).redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});

//Exporting routes
module.exports = router;