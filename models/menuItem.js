const mongoose = require("mongoose");

//schema för menyn
const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true,
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
})


//lägg till i menyn



//uppdatera menyn



//ta bort från menyn

const menuItem = mongoose.model("menuItem", menuSchema);
module.exports = menuItem;