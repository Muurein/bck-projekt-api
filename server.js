const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
require("dotenv").congif();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());

//router
app.use("/api", authRoutes);

//skyddad route




//validera jwt-token



//starta app
app.listen(port, () => {
    console.log(`Servern är startad på http://localhost:${port}`);
})