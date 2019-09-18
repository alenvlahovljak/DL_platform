//Modules config
const express = require("express");
const router = express.Router();


//Mongoose model config
const User = require("../../models/User");

//********   USER   **********//

//INDEX route
router.get("/portal/users", (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/portal/users/:id", (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        if(!user)
            res.status(302);
        return res.send(user);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//EDIT route
router.get("/portal/users/:id/edit", (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        //Note: ES6 notation {user} same as {user: user}
        res.render("user/edit", {user: user});
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
        res.redirect("/portal/users/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});


//Exporting routes
module.exports = router;
