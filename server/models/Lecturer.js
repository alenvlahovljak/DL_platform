//Modules config
const mongoose = require("mongoose");
const validator = require("validator");
const ageToBirth = require("age-to-birth-date");
 
//Model config
const Course = require("./Course");

//Mongoose schema config
const lecturerSchema = new mongoose.Schema({
    avatar: {
        type: Buffer
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/igm))
                throw new Error("Ime kursa mora sadržavati alfabetske karaktere!");
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Prezime mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/igm))
                throw new Error("Ime kursa mora sadržavati alfabetske karaktere!");
        }
    },
    birthDate: {
        type: Date,
        required: true,
        validate(value){
            const latestFor18YearsOld = ageToBirth.latestBirthDateForAge(18);
            const is18YearsOld = value < latestFor18YearsOld;
            if(!is18YearsOld)
                throw new Error("Morate biti punoljetni da bi registrovali račun!"); 
        }
    },
    streetName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime ulice mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E0-9\s,'-]*$/gmi))
                throw new Error("Ime ulice mora sadržavati alfanumeričke karaktere i specijalni znak \"-\"!");
        }
    },
    streetNum: {
        type: String,
        required: true,
        min: [1, "Broj ulice mora sadržavati minimalno jedan numerički karakter!"],
        validate(value){
            if(!validator.matches(value, /^[0-9]*$/gmi))
                throw new Error("Broj ulice mora sadržavati alfanumeričke karaktere!");
        }
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
        minlength: [3, "Ime općine/opštine/okruga mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E\s,'-]*$/igm))
                throw new Error("Ime općine/opštine/okruga može sadaržavati alfabetske karaktere i specijalni znak \"-\"!");
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime grada mora sadržavati minimlano 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E\s,'-]*$/igm))
                throw new Error("Ime grada može sadaržavati alfabetske karaktere i specijalni znak \"-\"!");
        }
    },
    country: { 
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Ime države mora sadržavati minimalno 3 karaktera!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/igm))
                throw new Error("Ime države može sadaržavati alfabetske karaktere!");
        }
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
});

//Delete Lecturers's courses when Lecturer is removed
lecturerSchema.pre("remove", async function(next){
    await Course.deleteMany({lecturer: this._id});
    next();
});

//Exporting mongoose model
module.exports = mongoose.model("Lecturer", lecturerSchema);