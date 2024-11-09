const User = require("../models/User");

exports.createUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: "Error creating the user", error: error.message});
    }
};

exports.obtainUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining users", error: error.message});
    }
};

exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining user", error: error.message});
    }
};

exports.updateUser = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: "Error when updating user", error: error.message});
    }
};

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error when deleting user", error: error.message});
    }
};