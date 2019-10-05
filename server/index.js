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


//Application config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


//Mongoose config
let URL = process.env.DATABASEURL || "mongodb://localhost:27017/DL_platform";
//let url = process.env.DATABASEURL || "mongodb+srv://Admin:Admin@cluster0-te1xc.mongodb.net/DL_platform?retryWrites=true&w=majority";
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});


//Routes config
app.use(indexRoutes);
app.use(userRoutes);
app.use(courseRoutes);
app.use(lecturerRoutes);


//Port logic set-up (local & heroku)
let PORT = process.env.PORT;
if(PORT==null || process.env.port=="")
    PORT = 5000;


//Express.js listening port
app.listen(PORT,()=> console.log("Server has started!"));