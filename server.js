//hämta
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(cors());

//importera
const authRoutesAdmin = require("./routes/authRoutesAdmin");
//const authRoutesMenu = require("./routes/authRoutesMenu");


//router
app.use("/apiAdmin", authRoutesAdmin);
//app.use("/apiMenu", authRoutesMenu);

//skyddad route
app.get("/apiAdmin/admins", (req,res) => {
    res.json({message: "admins skyddad route funkar"})
});



//validera jwt-token



//starta app
app.listen(port, () => {
    console.log(`Servern är startad på http://localhost:${port}`);
})