//Modules config
const mongoose = require("mongoose");
const validator = require("validator");

//Mongoose schema config
const lecturerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.isAlpha(value, "sr-RS@latin"))
                throw new Error("Ime može sadaržavati samo slova!");
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Prezime mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.isAlpha(value, "sr-RS@latin"))
                throw new Error("Ime može sadaržavati samo slova!");
        }
    },
    birthDate: {
        type: Date,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime ulice mora sadržavati minimalno 3 karaktera!"]
    },
    streetNum: {
        type: Number,
        required: true,
        min: [1]
    },
    postalCode: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isPostalCode(value, "any"))
                throw new Error("Poštanski broj nije validan!");
        }
    },
    municipality: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime opštine/okruga mora sadržavati minimalno 3 karaktera!"]
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime grada mora sadržavati minimlano 3 karaktera!"]
    },
    country: { 
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime grada mora sadržavati minimalno 3 karaktera!"]
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        min: [6, "Broje telefona je prekratak!"],
        validate(value){
            if(!validator.isMobilePhone(value, "any"))
                throw new Error("Uneseni telefonski broj nije validan!");
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Unesena e-mail adresa nije validna!");
        }
    }
}, {
    timestamps: true,
    toJSON : {virtuals: true}
});

//Virtuals document set-up
lecturerSchema.virtual("courses", {
    ref: "Course",
    localField: "_id",
    foreignField: "lecturer"
})


//Exporting mongoose model
module.exports = mongoose.model("Lecturer", lecturerSchema);