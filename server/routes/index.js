//Modules config
const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");

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



//********   AVATAR   **********//

//CREATE route (avatar)
router.post("/portal/:id/avatar", upload.single("avatar"), async (req, res)=>{
    //Capitalizing first letter
    const q = req.query.avatar.replace(/^\w/, c => c.toUpperCase());
    //Model generalization
    let Model = {};
    //Resizing image and converting to png format
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer();
    try{
        //Model choosing logic
        if(q=="User")
            Model = User;
        else if(q=="Lecturer")
            Model = Lecturer;
        else
            throw new Error("Greška");
        //Creating avatar buffer to mongoose model
        const model = await Model.findById(req.params.id);
        model.avatar = buffer;
        await model.save();
        res.send();
    } catch(err){
        throw new Error(err);
    }
}, (err, req, res, next)=>{
    res.send({err: err.message});
});

//SHOW route (avatar)
router.get("/portal/:id/avatar", async (req, res)=>{
    //Capitalizing first letter
    const q = req.query.avatar.replace(/^\w/, c => c.toUpperCase());
    //Model generalization
    let Model = {};
    try{
        //Model choosing logic
        if(q=="User")
            Model = User;
        else if(q=="Lecturer")
            Model = Lecturer;
        else
            throw new Error("Greška");
        const model = await Model.findById(req.params.id);
        if(!model || !model.avatar)
            throw new Error("Korisnik nije registrovan ili ne posjeduje avatara!");
        //Set-up file
        res.set("Content-Type", "image/png");
        res.send(model.avatar);
    } catch(err){
        throw new Error(err);
    }
});

//DELETE route (avatar)
router.delete("/portal/:id/avatar", async(req, res)=>{
    //Capitalizing first letter
    const q = req.query.avatar.replace(/^\w/, c => c.toUpperCase());
    //Model generalization
    let Model = {};
    try{
        //Model choosing logic
        if(q=="User")
            Model = User;
        else if(q=="Lecturer")
            Model = Lecturer;
        else
            throw new Error("Greška");
        //Deleting avatar buffer from mongoose model
        const model = await Model.findById(req.params.id);
        if(!model || !model.avatar)
            throw new Error("Korisnik nije registrovan ili ne posjeduje avatara!");
        model.avatar = undefined;
        model.save();
        res.send();
    } catch(err){
        throw new Error(err);
    }
    res.send();
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