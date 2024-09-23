const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "An username is required."],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9]+$/.test(v); 
            },
            message: "Please enter a valid username."
        }
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        validate: {
            validator: (v) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
            },
            message: "Please enter a valid password"
        }
    },
    projectCollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects"
    }]
});

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        next();
    });
});



const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
