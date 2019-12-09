//Modules config
const mongoose = require("mongoose");
const validator = require("validator");

//Model config
const Material = require("./Material");

//Mongoose schema config
const courseSchema = new mongoose.Schema({
    avatar: {
        type: Buffer
    },
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime kursa mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/gmi))
                throw new Error("Ime kursa mora sadržavati alfabetske karaktere!");
        }
    },
    moduleName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime modula mora sadražavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z0-9\u0161\u0111\u010D\u0107\u017E ]*$/gmi))
                throw new Error("Ime modula mora sadržavati alfanumeričke karaktere!");
        }
    },
    moduleDuration: {
        type: Number,
        required: true,
        min: [5, "Minimalna dužina video materijala mora biti duža od 5 minuta!"]
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer",
        required: true
    }
}, {
    timestamps: true,
});

//Delete Courses's materials when Course is removed
courseSchema.pre("remove", async function(next){
    await Material.deleteMany({course: this._id});
    next();
});

//Exporting mongoose model
module.exports = mongoose.model("Course", courseSchema);