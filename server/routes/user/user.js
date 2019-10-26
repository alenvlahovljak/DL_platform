//Modules config
const express = require("express");
const router = express.Router();


//Mongoose model config
const User = require("../../models/User");

//********   USER   **********//

//INDEX route
router.get("/portal/users", (req, res)=>{
    User.find({}).then((users)=>{
        res.json(users);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/portal/users/:id", (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        if(!user)
        //test it
            res.status(302).redirect("back");
        return res.json(user);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//UPDATE route
router.put("/portal/users/:id", (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body.userUpdate).then((user)=>{
        return res.redirect("/portal/users/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//DESTROY route
router.delete("/portal/users/:id", (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect("/portal/users");
    }).catch((err)=>{
        throw new Error(err);
    });
});


//Exporting routes
module.exports = router;
