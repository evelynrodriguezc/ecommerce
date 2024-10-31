const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, required: true}
    }],
    updateDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Cart", CartSchema);