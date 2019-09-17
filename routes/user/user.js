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
        return res.status(210).redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/users/:id", (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        return res.send(user);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//EDIT route
router.get("/users/:id/edit", (req, res)=>{
    res.status(204);
});

//UPDATE route
router.put("/users/:id", (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body.userUpdate).then((user)=>{
        return res.redirect("/users/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});

module.exports = router;
