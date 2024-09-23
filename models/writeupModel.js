    const mongoose = require("mongoose");


const writeupSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A write-up title is required."]
    },
    content: {
        type: String,
        required: [true, "A write-up content is required."]
    },
    uploadDate: {
        type: Date,
        required: [true, "A date is required"]
    },
    difficulty: {
        type: String,
        required: [true, "A difficulty is required"]
    },
    site: {
        type: String,
        required: [true, "A site is required"]
    }
});



const writeupModel = mongoose.model("Write-ups", writeupSchema);
module.exports = writeupModel;
