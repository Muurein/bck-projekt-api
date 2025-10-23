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
const authRoutesMenu = require("./routes/authRoutesMenu");


//router
app.use("/apiAdmin", authRoutesAdmin);
app.use("/apiMenu", authRoutesMenu);


//skyddad route - för admins
app.get("/apiAdmin", authenticateToken, (req,res) => {
    const token = req.headers.authorization.split(" ")[1];

    const verifyAdmin = authenticateToken(token);

    if(!verifyAdmin) {
        return res.status(401).json({ error: "Ogiltligt token" });
    }

    res.json(verifyAdmin);
});


//validera jwt-token för admin-inlogg
function authenticateToken(req, res, next) {
    const header = req.headers["authorization"];
    const jwtToken = header && header.split(" ")[1];

    //har anvädnaren en giltlig token?
    if(jwtToken == null) {
        return res.status(401).json({ message: "Du har inte tillgång hit, token saknas" });
    }

    //är det rätt token?
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) {
            return res.status(403).json({ message: "JWT:n som du har är fel" });
        }

        req.username = username;
        next();
    });
}


//starta app
app.listen(port, () => {
    console.log(`Servern är startad på http://localhost:${port}`);
})