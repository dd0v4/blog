const userModel = require("../models/userModel");
const projectModel = require("../models/projectModel");
const writeupModel = require("../models/writeupModel");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const authguard = require("../services/authguard");
const nodemailer = require("nodemailer");


userRouter.get("/", async (req, res) =>{
    res.render("./pages/home.twig");
});

userRouter.get("/login", async (req, res) =>{
    res.render("./pages/admin.twig",
    {
        title: "d0v4 / Login"
    });
    console.log(req.session.user)
});
userRouter.get("/register", async (req, res) => {
    res.render("./pages/register.twig");
});
userRouter.post("/register", async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        console.log("User created successfully:", user);
        res.redirect("/login");
    } catch(error) {
        console.error("Error creating user:", error);
        res.render("./pages/register.twig", {
            error: error.errors
        });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({ username: req.body.username }, { password: 1 }); 
        if (user && user.password) { 
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect("/panel");
            } else {
                throw { password: "Wrong username or password" }
            }
        } else {
            throw { username: "Wrong username or password" }
        }
    } catch (error) {
        res.render("./pages/admin.twig", {
            error: error
        });
    }
});

userRouter.get("/panel", authguard, async (req, res) => {
    try {
        res.render("./pages/panel.twig",
        {
            title: "d0v4 / Admin Panel"
        });
    } catch(error) {
        console.error(error); 
        res.status(500).send("Internal Server Error"); 
    }
});

userRouter.get("/addproject", authguard, async (req, res) => {
    res.render("./pages/addproject.twig",
    {
        title: "Add a new project",
    });
});

userRouter.post("/addproject", authguard, async (req, res) => {
    try {
        req.body.date = new Date();
        const project = new projectModel(req.body);
        await project.save();
        res.render("./pages/addproject.twig", {
            title: "Add a new project",
            success: "Project successfully created"
        })
    } catch(error) {
        console.error("Error :", error);
        res.render("./pages/addproject.twig", {
            error: error.errors
        });
    }
});

userRouter.get("/projects", async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.render("./pages/projects.twig", {
            title: "d0v4 / Projects",
            projects: projects
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.get("/deleteprojects",authguard, async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.render("./pages/deleteprojects.twig", {
            title: "d0v4 / Projects",
            projects: projects
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/deleteprojects/:id", authguard, async (req, res) => {
    try {
        const projects = await projectModel.find();
        await projectModel.deleteOne({_id: req.params.id});
        res.redirect("/deleteprojects")
    } catch (error) {
        console.error(error);
    }
});


userRouter.get("/projects/:id", async (req, res) => {
    try {
        const project = await projectModel.findOne({_id: req.params.id});
        res.render("./pages/project.twig", {
            title: project.title,
            content: project.content
        });
    } catch(error) {
        console.error(error);
    }
});

userRouter.get("/addwriteup",  async (req, res) => {
    res.render("./pages/addwriteup.twig",
    {
        title: "Add a new write-up",
    });
});

userRouter.post("/addwriteup", authguard,async (req, res) => {
    try {
        req.body.date = new Date();
        const project = new writeupModel(req.body);
        await project.save();
        res.render("./pages/addwriteup.twig", {
            title: "Add a new write up",
            success: "Write-up successfully created"
        })
    } catch(error) {
        console.error("Error :", error);
        res.render("./pages/addwriteup.twig", {
            error: error.errors
        });
    }
});

userRouter.get("/write-ups", async (req, res) => {
    try {
        const writeups = await writeupModel.find();
        res.render("./pages/writeups.twig", {
            title: "d0v4 / Write-ups",
            writeups: writeups
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.get("/write-ups/:id", async (req, res) => {
    try {
        const writeup = await writeupModel.findOne({_id: req.params.id});
        res.render("./pages/writeup.twig", {
            title: writeup.title,
            content: writeup.content
        });
    } catch(error) {
        console.error(error);
    }
});

userRouter.get("/deletewriteups", authguard, async (req, res) => {
    try {
        const writeups = await writeupModel.find();
        res.render("./pages/deletewriteups.twig", {
            title: "d0v4 / Write-ups",
            writeups: writeups
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/deletewriteups/:id", authguard, async (req, res) => {
    try {
        await writeupModel.deleteOne({_id: req.params.id});
        res.redirect("/deletewriteups")
    } catch (error) {
        console.error(error);
    }
});

userRouter.get("/contact", async (req, res) => {
    try {
        res.render("./pages/contact.twig", {
            title: "d0v4 / Contact",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/contact", async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'elbert62@ethereal.email',
                pass: 'CQYwnvDyTBPSWW4CQJ'
            }
        });
        const msg = {
            from: '"d0v4" <d0v4@d0v4.com>',
            to: email, 
            subject: subject, 
            text: message, 
        }
        async function main() {
            const info = await transporter.sendMail(msg);
            console.log("Message sent: %s", info.messageId);
        }
        await main(); 
        res.render("./pages/contact.twig", {
            title: "d0v4 / Contact",
            success: "Email successfully sent."
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.get("/about", (req, res) =>{
    try{
        res.render("./pages/about.twig", {
            title: "d0v4 / About"
        })
    }catch(error){
        console.error(error);
    }
});

userRouter.get("/panel/projects", authguard, async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.render("./pages/projects.twig", {
            title: "d0v4 / Projects",
            projects: projects,
            panel: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.get("/panel/projects/edit/:id" , authguard, async (req, res) => {
    try {
        const project = await projectModel.findOne({_id: req.params.id});
        res.render("./pages/editproject.twig", {
            title: project.title,
            content: project.content,
            language: project.language
        });
    } catch(error) {
        console.error(error);
    }
});

userRouter.post("/panel/projects/edit/:id", authguard, async (req, res) => {
    try {
        const project = await projectModel.findOne({_id: req.params.id});
        await projectModel.findOneAndUpdate({_id: req.params.id}, req.body);

        res.render("./pages/editproject.twig", {
            title: project.title,
            content: project.content,
            success: true,
        });

    } catch(error) {
        console.error("Error :", error);
        res.render("./pages/editproject.twig", {
            error: error.errors
        });
    }
});


userRouter.get("/panel/write-ups",authguard, async (req, res) => {
    try {
        const writeups = await writeupModel.find();
        res.render("./pages/writeups.twig", {
            title: "d0v4 / Write-Ups",
            writeups: writeups,
            panel: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.get("/panel/write-ups/edit/:id", authguard, async (req, res) => {
    try {
        const writeup = await writeupModel.findOne({_id: req.params.id});
        res.render("./pages/editwriteup.twig", {
            title: writeup.title,
            content: writeup.content,
            difficulty: writeup.difficulty
        });
    } catch(error) {
        console.error(error);
    }
});

userRouter.post("/panel/write-ups/edit/:id", authguard,async (req, res) => {
    try {
        const writeup = await writeupModel.findOne({_id: req.params.id});
        await writeupModel.findOneAndUpdate({_id: req.params.id}, req.body);

        res.render("./pages/editwriteup.twig", {
            title: writeup.title,
            content: writeup.content,
            success: true,
            difficulty: writeup.difficulty
        });

    } catch(error) {
        console.error("Error :", error);
        res.render("./pages/editwriteup.twig", {
            error: error.errors
        });
    }
});


module.exports = userRouter;