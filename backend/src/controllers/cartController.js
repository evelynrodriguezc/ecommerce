const Cart = require("../models/cart");
const Product = require("../models/product");

exports.createCart = async(req, res) => {
    const { user_id, products } = req.body
    try {
        const productsIds = products.map(p => p.product);
        const validProducts = await Product.find({ _id: { $in: productsIds } });
        if(validProducts.length !== productsIds.length){
            return res.status(400).json({ message: "One or more products are not valid" });
        }

        const newCart = new Cart({
            user_id,
            products
        });
        await newCart.save();
        res.status(201).json({ meesage: "Cart created", cart: newCart });
    } catch (error) {
        res.status(500).json({message: "Error creating the cart", error: error.message});
    }
};

exports.obtainCart = async(req, res) => {
    const { user_id } = req.params
    try {
        const cart = await Cart.findOne({ user_id }).populate("products.product");
        if(!cart){
            return res.status(404).json({ message: "Cart not found" })
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining cart", error: error.message});
    }
};


exports.updateCart = async(req, res) => {
    const { user_id, products } = req.body
    try {
        const productsIds = products.map(p => p.product);
        const validProducts = await Product.find({ _id: { $in: productsIds } });
        if(validProducts.length !== productsIds.length){
            return res.status(400).json({ message: "One or more products are not valid" });
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            { user_id },
            { products },
            { new: true }
        );
        if (!updatedCart){
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart updated", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Error when updating cart", error: error.message });
    }
};

exports.deleteCart = async(req, res) => {
    const { user_id } = req.params
    try {
        const deletedCart = await Cart.findOneAndUpdate(
            { user_id },
            { products: [] },
            { new: true }
        )
        if(!deletedCart){
            return res.status(404).json({ message: "Cart not found" });
        };
        res.status(200).json({ message: "Empty cart", cart: deletedCart });
    } catch (error) {
        res.status(500).json({ message: "Error when deleting cart", error: error.message });
    }
};