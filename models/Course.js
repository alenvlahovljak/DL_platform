//Modules config
const mongoose = require("mongoose");
const validator = require("validator");

//Mongoose schema config
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime kursa mora sadržavati minimalno 3 karaktera!"]
    },
    moduleName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime modula mora sadražavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.isAlphanumeric(value, "sr-RS@latin"))
                throw new Error("Ime kursa mora sadržavati samo slova!");
        }
    },
    moduleDuration: {
        type: Number,
        required: true,
        min: [5, "Minimalna dužina video materijala mora biti duža od 5 minuta!"]
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer"
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

//Exporting mongoose model
module.exports = mongoose.model("Course", courseSchema);