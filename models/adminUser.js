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
        minlength: 12
    }
})


//kryptera admin-lösenordet
adminSchema.pre("save", async function(next) {
    try {
        //kollar om lösenordet är nytt eller ändrat samt hashar det
        if(this.isNew || this.isModified("password")) {
            const passwordHashed = await bcrypt.hash(this.password, 12);
            this.password = passwordHashed;
        };
        next();
    } catch (error) {
        next(error);
    }
});




//jämför lösenordet användaren skriver in med det hashade lösenordet
adminSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);

    } catch(error) {
        throw error;
    }
}


//lägg till adminanvändare - funktionen ska finnas även om öfretaget för tillfället bara har en adminanvändare
adminSchema.statics.register = async function (username, password) {
    try {
        const admin = new this({ username, password });

        await admin.save();
        return admin;

    } catch (error) {
        throw error;
    };
};


//logga in admin-användare
adminSchema.statics.login = async function(username, password) {
    try {
        //hitta användarnamnet
        const admin = await this.findOne({ username });

        //om användarnamnet inte finns -> error
        if(!admin) {
            throw new error("Användarnamnet eller lösenordet är felaktigt");
        }

        //jämför lösenordet
        const rightPassword = await admin.comparePassword(password);

        //om lösenordet är fel -> error
        if(!rightPassword) {
            throw new Error("Användarnamet eller lösenordet är fel");
        }

        //returnera om allt stämmer
        return admin;
    } catch (error) {
        throw error;
    }
};




//uppdatera användare



//ta bort användare



const adminUser = mongoose.model("adminUser", adminSchema);
module.exports = adminUser;



