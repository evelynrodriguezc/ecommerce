const Cart = require("../models/cart");

exports.createCart = async(req, res) => {
    const { userId, products } = req.body
    try {
        const newCart = new Cart({
            userId,
            products
        });
        await newCart.save();
        res.status(201).json({ meesage: "Cart created", cart: newCart });
    } catch (error) {
        res.status(500).json({message: "Error creating the cart", error: error.message});
    }
};

exports.obtainCart = async(req, res) => {
    const { userId } = req.params
    try {
        const cart = await Cart.findOne({ userId: userId}).populate("user").populate("products.product");
        if(!cart){
            return res.status(404).json({ message: "Cart not found" })
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining cart", error: error.message});
    }
};


exports.updateCart = async(req, res) => {
    const { userId, products } = req.body
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            { userId: userId },
            { products },
            { new: true }
        );
        if (!updatedCart){
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart updated", cart: updatedCart});
    } catch (error) {
        res.status(500).json({message: "Error when updating cart", error: error.message});
    }
};

exports.deleteCart = async(req, res) => {
    const { userId } = req.params
    try {
        const deletedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            { products: [] },
            { new: true }
        )
        if(!deletedCart){
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({message: "Empty cart", cart: deletedCart });
    } catch (error) {
        res.status(500).json({message: "Error when deleting cart", error: error.message});
    }
};