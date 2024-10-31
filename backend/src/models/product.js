const mongoose = require("mongoose");
const category = require("./category");

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    stock: {type: Number, default: 0},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true}
});

module.exports = mongoose.model("Product", ProductSchema);