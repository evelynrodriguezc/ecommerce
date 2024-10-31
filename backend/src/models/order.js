const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required},
        price: {type: Number, required: true}
    }],
    total: {type: Number, required: true},
    status: {type: String, enum: ["pending", "shipped", "delivered", "canceled"], default: "pending"},
    dateOfCreation: {type: Date, default: Date.now()},
});

module.exports = mongoose.model("Order", OrderSchema);
