//Modules config
const express = require("express");
const router = express.Router();


//Mongoose models config
const User = require("../../models/User");



//********   USER   **********//

//NEW route
router.get("/users/new", (req, res)=>{
    res.render("user/new");
});

//CREATE route
router.post("/users", (req, res)=>{
    User.create(req.body.newUser).then((user)=>{
        console.log(user);
        return res.redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/users/:id", (req, res)=>{
    res.render("user/show");
});

module.exports = router;
