const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//koppla till databasen
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB).then(() => {
    console.log("Du är nu uppkopplad till databasen på MongoDB");
});


//importera modeller
const adminUser = require("../models/adminUser");
const menuItem = require("../models/menuItem");


//lägg till ny admin-användare
//validera att alla fält är ifyllda och att det som behöver vara unikt är det



//logga in admin-anvädnare
//validera att användarnamn och lösen är rätt



//uppdatera admin-användare
//validera att alla fält är ifyllda


//ta bort admin-användare




//lägg till i menyn
//validera att alla fält är ifyllda och att det som behöver vara unikt är det



//uppdatera menyn
//validera att alla fält är ifyllda



//ta bort från menyn




