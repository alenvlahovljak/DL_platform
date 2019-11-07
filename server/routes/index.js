//Modules config
const express = require("express");
const router = express.Router();
const multer = require("multer");

//Multer config
const upload = multer({
    //dest: "avatars",
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error("Prihvatljivi format slike je jpg, jpeg i png"));
        cb(undefined, true);
    }
});

//Mongoose model config
const User = require("../models/User");
const Lecturer = require("../models/Lecturer");

//CREATE route (avatar)
router.post("/portal/:id/avatar", upload.single("avatar"), async (req, res)=>{
    //Handling avatar logic
    const q = req.query.avatar.replace(/^\w/, c => c.toUpperCase());
    let Model = {};
    try{
        if(q=="User")
            Model = User;
        else if(q=="Lecturer")
            Model = Lecturer;
        else
            throw new Error("Greška");
        await Model.findById(req.params.id).then((model)=>{
            model.avatar = req.file.buffer;
            model.save();
        });
    } catch(err){
        throw new Error(err);
    }
    res.send();
}, (err, req, res, next)=>{
    res.send({err: err.message});
});


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