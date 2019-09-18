//Modules config
const express = require("express");
const router = express.Router();


//Mongoose model config
const Lecturer = require("../../models/Lecturer");


//********   USER   **********//

//INDEX route
router.get("/portal/lecturers", (req, res)=>{
    Lecturer.find({}).then((lecturers)=>{
        res.send(lecturers);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//SHOW route
router.get("/portal/lecturers/:id", (req, res)=>{
    Lecturer.findById(req.params.id).then((lecturer)=>{
        res.send(lecturer);
    }).catch((err)=>{
        throw new Error(err);
    });
});

//EDIT route
router.get("/portal/lecturers/:id/edit", (req, res)=>{
    Lecturer.findById(req.params.id).then((lecturer)=>{
        res.render("lecturer/edit", {lecturer: lecturer});
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
    Lecturer.findByIdAndRemove(req.params.id).then(()=>{
        return res.redirect("/portal/lecturers/" + req.params.id);
    }).catch((err)=>{
        throw new Error(err);
    });
});


//Exporting routes
module.exports = router;