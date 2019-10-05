//Modules config
const express = require("express");
const router = express.Router();

//Mongoose model config
const User = require("../models/User");
const Lecturer = require("../models/Lecturer");

//********   USER   **********//

//REGISTER CREATE route
router.post("/register", (req, res)=>{
    User.create(req.body.newUser).then((user)=>{
        return res.status(210).redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});


//********   LECTURER   **********//

//CREATE route
router.post("/lecturers", (req, res)=>{
    Lecturer.create(req.body.newLecturer).then((lecturer)=>{
        return res.status(210).redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});

//Exporting routes
module.exports = router;