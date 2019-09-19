//Modules config
const express = require("express");
const router = express.Router();

//Mongoose model config
const Lecturer = require("../../models/Lecturer");
const Course = require("../../models/Course");


//********   COURSE   **********//

//INDEX route
router.get("/portal/courses", (req, res)=>{
    Course.find({}).then((courses)=>{
        res.send(courses);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//NEW route
router.get("/portal/courses/new", (req, res)=>{
    Lecturer.find({}).then((lecturers)=>{
        res.render("course/new", {lecturers: lecturers});
    }).catch((err)=>{
        throw new Error(err);
    });
});

//CREATE route
router.post("/portal/courses", (req, res)=>{
    console.log(req.body);
    Course.create(req.body.newCourse).then((course)=>{
        return res.status(210).redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/portal/courses/:id", (req, res)=>{     
    Course.findById(req.params.id).then((course)=>{
        res.send(course);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//EDIT route
router.get("/portal/courses/:id/edit", async (req, res)=>{
    try{
        const lecturers = await Lecturer.find({});
        const course = await Course.findById(req.params.id);
        return res.render("course/edit", {lecturers: lecturers, course: course});
    } catch(err){
        throw new Error(err);
    }
});


//Exporting routes
module.exports = router;
