//Modules config
const express = require("express");
const app = express();
const mongoose = require("mongoose"); 

//Mongoose models config


//Mongoose config
let url = process.env.DATABASEURL || "mongodb://localhost:27017/DL_platfom";
mongoose.connect(url, {useNewUrlParser: true});

//Application set-up
app.set("view engine", "ejs");

//Routes config
const userRoutes = require("./routes/user/user");

//Serving routes config
app.use(userRoutes);

//Application config


//********   MAIN   **********/
//INDEX route
app.get("/portal", (req, res)=>{
    res.render("index");
});


app.listen(3000,()=>{
    console.log("DL server has started!");
});

