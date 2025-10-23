const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const menuItem = require("../models/menuItem");
require("dotenv").config();

//koppla till databasen
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB).then(() => {
    console.log("Du är nu uppkopplad till databasen på MongoDB");
}).catch((error) => {
    console.log("Ett fel uppstod vid uppkoppling till databasen: " + error);
})

//lägg till i menyn
//validera att alla fält är ifyllda och att det som behöver vara unikt är det
router.post("/addToMenu", async (req, res) => {
    try {
        const { itemName, type, description, price } = req.body;

        //är något fält som inte får vara tomt tomt?
        if(!itemName || !type || !price) {
            return res.status(400).json({ error: "Produktnamn, typ av produkt och pris måste vara ifyllda. Produktbeskrviningen är valfri." });
        }

        //är produktnamnet ledigt?
        const itemExist = await menuItem.findOne({ menuItem });

        if(itemExist) {
            return res.status(400).json({ error: "En annan produkt har redan det här namnet" });
        }

        //finns produkten -> den läggs till i menyn
        const item = new menuItem({ itemName, type, description, price });

        await item.save();
        res.status(500).json({ message: "En produkt har lagts till "});
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error });
    }
});


//uppdatera menyn
router.put("/updateMenu/:id", async (req, res) => {
    try {
        //hämtar id och updpaterar adminanvändaren som hör till det id:t
        const { id } = req.params;
        const updatedItem = await menuItem.findByIdAndUpdate(id, req.body, { new: true });

        //kollar om användaren finns
        if(!updatedItem) {
            return res.status(404).json({ message: "Produkten hittades inte" });
        }

        res.status(200).json(updatedItem, { message: "Produkten har uppdaterats" });
    } catch(error) {
        res.status(500).json({ error: "Server error: " + error });
    }
});


//ta bort från menyn
router.delete("/deleteMenu/:id", async (req, res) => {
    try {
        //hämtar id och updpaterar adminanvändaren som hör till det id:t
        const { id } = req.params;
        const deletedItem = await menuItem.findByIdAndDelete(id);

        //finns produkten?
        if(!deletedItem) {
            return res.status(404).json({ message: "Produkten hittades inte" });
        }

        res.status(200).json({ message: "Produkten har tagits bort från menyn" });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error });
    }
})