const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const DeliverySchema = new mongoose.Schema({
    delivery_id: ObjectId,
    status: String,
    products:[ {
        type: ObjectId,
        required: true
    }],
    customer_id: {
        type: ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Delivery", DeliverySchema);