//Modules config
const express = require("express");
const router = express.Router();

//Mongoose model config
const Course = require("../../models/Course");


//********   COURSE   **********//

//CREATE route
router.get("/portal/courses/new", (req, res)=>{
    res.render("course/new");
});


//Exporting routes
module.exports = router;
