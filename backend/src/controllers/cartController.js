const Cart = require("../models/cart");

exports.createCart = async(req, res) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({message: "Error creating the cart", error: error.message});
    }
};

exports.obtainCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({user: req.params.userId}).populate("user").populate("products.product");
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining cart", error: error.message});
    }
};

exports.getAllCarts = async(req, res) => {
    try {
        const carts = await Cart.find()
            .populate("user")
            .populate("products.product");
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining carts", error: error.message});
    }
};


exports.updateCart = async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({message: "Error when updating cart", error: error.message});
    }
};

exports.deleteCart = async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Cart deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error when deleting cart", error: error.message});
    }
};