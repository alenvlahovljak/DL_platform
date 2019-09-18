//Modules config
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const methodOverride  = require("method-override");

//Mongoose models config


//Routes set-up
const indexRoutes = require("./routes/index");
const lecturerRoutes = require("./routes/lecturer/lecturer");
const userRoutes = require("./routes/user/user");
const courseRoutes = require("./routes/course/course");

//Application set-up
app.set("view engine", "ejs");

//Application config
app.use(bodyParser.urlencoded({extended: true}));
//testing purpose
app.use(bodyParser.json());
app.use(methodOverride("_method"));



//Mongoose config
let url = process.env.DATABASEURL || "mongodb://localhost:27017/DL_platform";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});





//Routes config
app.use(indexRoutes);
app.use(userRoutes);
app.use(courseRoutes);
app.use(lecturerRoutes);


//********   MAIN   **********/
//INDEX route
app.get("/portal", (req, res)=>{
    res.render("index");
});


//Port listening
app.listen(3000,()=>{
    console.log("DL server has started!");
    console.log("*************************************");
});

