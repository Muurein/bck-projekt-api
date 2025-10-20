const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//schema för adminUser
//eftersom det bara är tänkt att finnas en adminUser (kanske någon mer i framtiden) sparas bara användarnamn och lösenord då flera i personalen skulle kunna använda det
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    }
})


//kryptera admin-lösenordet




//jämför lösenordet användaren skriver in med det hashade lösenordet




//logga in admin-användare




//lägg till adminanvändare - BEHÖVS???? ska gå men finns för tillfället bara en?




//uppdatera användare



//ta bort användare



const adminUser = mongoose.model("adminUser", adminSchema);
module.exports = adminUser;



