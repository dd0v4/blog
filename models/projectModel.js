const mongoose = require("mongoose");


const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A project title is required."]
    },
    content: {
        type: String,
        required: [true, "A project content is required."]
    },
    uploadDate: {
        type: Date,
        required: [true, "A date is required"]
    },
    language: {
        type: String,
        required: [true, "A language is required"]
    }
});



const projectModel = mongoose.model("Projects", projectSchema);
module.exports = projectModel;
