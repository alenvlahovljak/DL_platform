//Modules config
const express = require("express");
const app = express();

//Application set-up
app.set("view engine", "ejs");

//Application config




//********   MAIN   **********/
//INDEX route
app.get("/portal", (req, res)=>{
    res.render("index");
});

app.listen(3000,()=>{
    console.log("DL server has started!");
});