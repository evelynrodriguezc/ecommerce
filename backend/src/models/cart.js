const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema ({
    user_id: {type: String, required: true},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true}
    }],
    updateDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Cart", CartSchema);