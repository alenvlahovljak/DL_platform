//Modules config
const express = require("express");
const router = express.Router();


//Mongoose model config
const User = require("../../models/User");

//********   USER   **********//

//SHOW route
router.get("/users/:id", (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        if(!user)
            res.status(302);
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

//DESTROY route
router.delete("/users/:id", (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect("/users/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});


//Exporting routes
module.exports = router;
