//Not in use
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const ShoppingListSchema = new mongoose.Schema({
    list_id: ObjectId,
    customer_id: ObjectId,
    list_name: String,
    list_items: [{
        product_id: ObjectId,
        name: String,
        price: Number,
        quantity: Number,
        img: String
    }],
    items_count: Number,
    total_price: Number
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);