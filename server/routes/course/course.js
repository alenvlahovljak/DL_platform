//Modules config
const express = require("express");
const router = express.Router();

//Mongoose model config
const Lecturer = require("../../models/Lecturer");
const Course = require("../../models/Course");


//********   COURSE   **********//

//INDEX route
router.get("/portal/courses", async (req, res)=>{
    //Regular Expressions with global, multiline and case-insensitive modifiers
    courseName = new RegExp(req.query.courseName, "gmi");
    moduleName = new RegExp(req.query.moduleName, "gmi");
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
    //filtering data by courseName and(or) moduleName parameter(s): GET /portal/courses?courseName=...&moduleName=...
    //paginating data by limit and(or) skip parameters: GET /portal/courses?limit=...&skip=...
    //sorting data by sortBy parameter (asc or desc order): GET /portal/courses?sortBy=...:asc/desc
    await Course.find({courseName, moduleName}, null, {limit, skip, sort})
    .populate("lecturer").exec((err, lecturer)=> res.json(lecturer));
    } catch(err){
        throw new Error(err);
    }
});

/*
//NEW route
router.get("/portal/courses/new", (req, res)=>{
    Lecturer.find({}).then((lecturers)=>{
        res.render("course/new", {lecturers: lecturers});
    }).catch((err)=>{
        throw new Error(err);
    });
});
*/

//CREATE route
router.post("/portal/courses", (req, res)=>{
    Course.create(req.body.newCourse).then((course)=>{
        return res.status(210).redirect("/portal");
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/portal/courses/:id", (req, res)=>{     
    Course.findById(req.params.id).then((course)=>{
        res.json(course);
    }).catch((err)=>{
        throw new Error(err);
    });
});

/*
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
*/

//UPDATE route
router.put("/portal/courses/:id", (req, res)=>{
    Course.findByIdAndUpdate(req.params.id, req.body.courseUpdate).then((course)=>{
        return res.redirect("/portal/courses/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//DESTROY route
router.delete("/portal/courses/:id", (req, res)=>{
    Course.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect("/portal/courses");
    }).catch((err)=>{
        throw new Error(err);
    })
});


//Exporting routes
module.exports = router;
