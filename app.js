const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT;
const db = process.env.DB;
const app = express();
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRouter");

app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: "jnirmallo",
    resave: true,
    saveUninitialized: true
}));
app.use(userRouter);
app.use(express.static("./public"));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`Connecté au serveur sur le port ${port}`);
    }
});

mongoose.set("strictQuery", true);
mongoose.connect(db)
    .then(() => {
        console.log("Connecté à MongoDB");
    })
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB :", err);
    });
