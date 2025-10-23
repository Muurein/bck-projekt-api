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
router.post("/register", (req, res) => {
    res.json({message: "register admin funkar"});
});


//logga in admin-anvädnare
//validera att användarnamn och lösen är rätt
router.post("/login", (res, req) => {
    res.json({message: "login admin funkar"});
})


//uppdatera admin-användare
//validera att alla fält är ifyllda


//ta bort admin-användare




//lägg till i menyn
//validera att alla fält är ifyllda och att det som behöver vara unikt är det



//uppdatera menyn
//validera att alla fält är ifyllda



//ta bort från menyn


module.exports = router;

