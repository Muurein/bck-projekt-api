const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//koppla till databasen
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB).then(() => {
    console.log("Du är nu uppkopplad till databasen på MongoDB");
}).catch((error) => {
    console.log("Ett fel uppstod vid uppkoppling till databasen: " + error);
});


//importera modeller
const adminUser = require("../models/adminUser");
//const menuItem = require("../models/menuItem");


//lägg till ny admin-användare
//validera att alla fält är ifyllda och att det som behöver vara unikt är det
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //är något fält tomt?
        if(!username || !password) {
            return res.status(400).json({ error: "Du behöver fylla i alla fält"});
        }

        //är lösenordet långt nog (12 tecken)?
        if(password.length < 12) {
            return res.status(400).json({ error: "Lösenordet behöver vara minst 12 tecken långt" });
        }

        //är användarnamnet ledigt?
        const adminExist = await adminUser.findOne({ username });

        if(adminExist) {
            return res.status(400).json({ error: "Användarnamnet finns redan" });
        }

        //användaren registreras om användarnamnet är ledig
        const admin = new adminUser({ username, password });

        await admin.save();
        res.status(500).json({ message: "En ny användare är skapad" });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error });
    }
});


//logga in admin-anvädnare
//validera att användarnamn och lösen är rätt
router.post("/login", async (req, res) => {
    try {
        //inloggninsinfo
        const { username, password } = req.body;

        //är något fält tomt?
        if(!username || !password) {
            return res.status(400).json({ error: "Du behöver fylla i alla fält" });
        }

        //finns användarnamnet?
        const admin = await adminUser.findOne({ username });

        //skicka felmeddelande om användarnamnet är fel
        //specificera inte om det är lösenordet eller användarnamnet som är fel - för säkerthetens skull
        if(!adminUser) {
            return res.status(401).json({ error: "Användarnamnet eller lösordet är fel" });
        }

        //är lösenordet rätt?
        const rightPassword = await adminUser.comparePassword(password);
        if(!rightPassword) {
            return res.status(401).json({ error: "Andändarnamnet eller lösenordet är fel" });
        } else {
            //skapa jwt om lösenordet är rätt
            const payload = {username, password };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h" });

            //meddela att anvädnaren är inloggad
            const response = {
                message: username + " är inloggad",
                token: token
            };

            res.status(200).json({ response });
        }
    } catch(error) {
        res.status(500).json({ error: "Server error: " + error });
    }
})


//uppdatera admin-användare
router.put("/updateAdmin/:id", async (req, res) => {
    try {
        //hämtar id och updpaterar adminanvändaren som hör till det id:t
        const { id } = req.params;
        const updatedAdmin = await adminUser.findByIdAndUpdate(id, req.body, { new: true });

        //kollar om användaren finns
        if(!updatedAdmin) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }

        res.status(200).json(updatedAdmin, { message: "Användaren har uppdaterats" });
    } catch(error) {
        res.status(500).json({ error: "Server error: " + error });
    }
});

//ta bort admin-användare
router.delete("/deleteAdmin/:id", async (req, res) => {
    try {
        //hämtar id och updpaterar adminanvändaren som hör till det id:t
        const { id } = req.params;
        const deletedAdmin = await adminUser.findByIdAndDelete(id);

        //finns användaren?
        if(!deletedAdmin) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }

        res.status(200).json({ message: "Användaren har tagits bort" });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error });
    }
})





module.exports = router;

