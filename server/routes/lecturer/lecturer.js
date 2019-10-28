//Modules config
const express = require("express");
const router = express.Router();


//Mongoose model config
const Lecturer = require("../../models/Lecturer");


//********   USER   **********//

//INDEX route
//*note: fix security vulnerability - hide unnecessary data /flash: null arg
router.get("/portal/lecturers", async (req, res)=>{
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
        //filtering data by firstName and(or) lastName parameter(s): GET /portal/lecturers?firstName=...&lastName=...
        //paginating data by limit and(or) skip parameters: GET /portal/lecturers?limit=...&skip=...
        //sorting data by sortBy parameter (asc or desc order): GET /portal/lecturers?sortBy=...:asc/desc
        await Lecturer.find({firstName, lastName}, null, {limit, skip, sort})
        .populate("courses").exec((err, lecturers)=> res.json(lecturers));
        //.then((lecturers)=>{
        //    res.json(lecturers);
        //});
    } catch(err){
        throw new Error(err);
    }
});

//SHOW route
router.get("/portal/lecturers/:id", (req, res)=>{
    Lecturer.findById(req.params.id).populate("courses").exec().then((lecturer)=>{
        res.json(lecturer);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//UPDATE route
router.put("/portal/lecturers/:id", (req, res)=>{
    Lecturer.findByIdAndUpdate(req.params.id, req.body.lecturerUpdate).then((lecturer)=>{
        return res.redirect("/portal/lecturers/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//DESTROY route
router.delete("/portal/lecturers/:id", (req, res)=>{
    Lecturer.findById(req.params.id).then((lecturer)=>{
        lecturer.remove();
        return res.redirect("/portal/lecturers");
    }).catch((err)=>{
        throw new Error(err);
    });
});


//Exporting routes
module.exports = router;