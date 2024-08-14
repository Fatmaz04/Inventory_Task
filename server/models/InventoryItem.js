const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    identifier: String,
    quantity: Number,
    location: String,
    description: String,
    category: String,
    supplier: String,
    price: Number
})

const ItemModel = mongoose.model("inventoryitems",ItemSchema)

module.exports = ItemModel