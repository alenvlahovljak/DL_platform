//Modules config
const mongoose = require("mongoose");

//Mongoose schema config
const materialSchema = new mongoose.Schema({
    video: Object,
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
}, {
    timestamps: true
});

//Exporting mongoose model
module.exports = mongoose.model("Material", materialSchema);