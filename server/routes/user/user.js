//Modules config
const express = require("express");
const router = express.Router();


//Mongoose model config
const User = require("../../models/User");

//********   USER   **********//

//INDEX route
router.get("/portal/users", async (req, res)=>{
    //Regular Expressions with global, multiline and case-insensitive modifiers
    const firstName = new RegExp(req.query.firstName, "gmi");
    const lastName = new RegExp(req.query.lastName, "gmi");
    //parsing limit and skip queries
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    //handling sortBy logic
    const sort = {};
    if(req.query.sortBy){
        const chunks = req.query.sortBy.split(":");
        sort[chunks[0]] = chunks[1] === "desc"? -1 : 1;
    }
    try{
        //filtering data by firstName and(or) lastName parameter(s): GET /portal/users?firstName=...&lastName=...
        //paginating data by limit and(or) skip parameters: GET /portal/users?limit=...&skip=...
        //sorting data by sortBy parameter (asc or desc order): GET /portal/users?sortBy=...:asc/desc
        await User.find({firstName, lastName}, null, {limit, skip, sort})
        .then((users)=> res.json(users));
    } catch(err){
        throw new Error(err);
    }
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
