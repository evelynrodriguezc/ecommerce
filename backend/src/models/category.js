const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    creationDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Category", CategorySchema);