const mongoose = require("mongoose");

const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    role: {type: String, enum: ["client", "admin"], default: "client"},
    registrationDate: {type: Date, default: Date.now},
}));

module.exports = User;