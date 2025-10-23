const mongoose = require("mongoose");

//schema för menyn
//itemName = ex. Blåbärsmuffin, Latte
//type = mjuk kaka, hård kaka, varm dryck, kall dryck, bakelse, tårta, smörgås
//beskrivning = ex. innehåll, allergier, vegetarisk
//price = pris
const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    price: {
        type: String,
        required: true,
        unique: false
    }
});


//lägg till i menyn
menuSchema.statics.register = async function (itemName, type, description, price) {
    try {
        const menuItem = new this({ itemName, type, description, description, price});

        await menuItem.save();
        return menuItem;

    } catch(error) {
        throw error;
    }
}


//uppdatera menyn



//ta bort från menyn


const menuItem = mongoose.model("menuItem", menuSchema);
module.exports = menuItem;