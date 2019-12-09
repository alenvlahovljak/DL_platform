//Modules config
const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");

//Multer config
const avatar = multer({
    //dest: "avatars",
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error("Prihvatljivi format slike je jpg, jpeg i png!"));
        cb(undefined, true);
    }
});

const video = multer({
    limits: {
        //1 GB max upload
        fileSize: 1024 * 1024 * 1024
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(mp4)$/))
            return cb(new Error("Prihvatljivi format videa je mp4!"));
        cb(undefined, true);
    }
});


//Mongoose model config
const User = require("../models/User");
const Lecturer = require("../models/Lecturer");
const Course = require("../models/Course");
const Material = require("../models/Material");



//********   AVATAR   **********//

//CREATE route (avatar)
router.post("/portal/:id/avatar", avatar.single("avatar"), async (req, res)=>{
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
        else if(q=="Course")
            Model = Course;
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
        else if(q=="Course")
            Model = Course;
        else
            throw new Error("Greška");
        const model = await Model.findById(req.params.id);
        if(!model || !model.avatar)
            throw new Error("Korisnik (ili predavač ili kurs) nije registrovan ili ne posjeduje avatara!");
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
        else if(q=="Course")
            Model = Course;
        else
            throw new Error("Greška");
        //Deleting avatar buffer from mongoose model
        const model = await Model.findById(req.params.id);
        if(!model || !model.avatar)
            throw new Error("Korisnik (ili predavač ili kurs) nije registrovan ili ne posjeduje avatara!");
        model.avatar = undefined;
        model.save();
        res.send();
    } catch(err){
        throw new Error(err);
    }
    res.send();
});



//********   VIDEO   **********//

//CREATE route (video)
router.post("/portal/:id/video", video.single("video"), async (req, res)=>{
    try{
        const course = await Course.findById(req.params.id);
        if(course){
            const materialObj = {
                video: req.file,
                lecturer: req.query.lecturer,
                course: course._id
            };
            Material.create(materialObj).then((material)=>{
                return res.status(210).redirect("/portal");
            }).catch((err)=>{
                throw new Error(err);
            });
        }
    } catch(err){
        throw new Error(err);
    }
}, (err, req, res, next)=>{
    res.send({err: err.message});
});

//SHOW route (video)
router.get("/portal/:id/video", async (req, res)=>{
    try{
        const course = await Course.findById(req.params.id);
        const material = await Material.find({course: req.params.id});
        if(!course || !material[0])
            throw new Error("U bazi ne postoji kurs ili pripadajući video materijal!");
        res.set("Content-Type", material[0].video.mimetype);
        res.send(material[0].video.buffer);
    } catch(err){
        throw new Error(err);
    }
});

//DELETE route (video)
router.delete("/portal/:id/video", async (req, res)=>{
    try{
        const course = await Course.findById(req.params.id);
        const material = await Material.find({course: req.params.id});
        if(!course || !material[0])
            throw new Error("U bazi ne postoji video materijal!");
        await Material.deleteOne({course: req.params.id});
        res.send();
    } catch(err){
        throw new Error(err);
    }
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