const Cart = require("../models/cart");
const Product = require("../models/product");
const pool = require("../config/dataBasePostgres");

// Create a cart
exports.createCart = async(req, res) => {
    const { user_id, products } = req.body
    try {
        // Verify if the user exists
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
        if(userResult.rowCount === 0){
            return res.status(404).json({ message: "User not found in PGSQL" });
        }
        // Validate products
        const productsIds = products.map(p => p.product);
        const validProducts = await Product.find({ _id: { $in: productsIds } });
        if(validProducts.length !== productsIds.length){
            return res.status(400).json({ message: "One or more products are not valid" });
        }

        // Verify if there is already a cart for the user
        const existingCart = await Cart.findOne({ user_id });
        if(existingCart){
            return res.status(400).json({ message: "Cart already exists" });
        }

        // Create the cart
        const newCart = new Cart({
            user_id,
            products
        });
        await newCart.save();

        res.status(201).json({ meesage: "Cart created", cart: newCart });
    } catch (error) {
        res.status(500).json({ message: "Error creating the cart", error: error.message});
    }
};

// Obtain a cart
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

// Update a cart
exports.updateCart = async(req, res) => {
    const { user_id, products } = req.body
    try {
        const cart = await Cart.findOneAndUpdate(
            { user_id },
            { products },
            { new: true }
        );
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Error when updating cart", error: error.message });
    }
};

// Delete cart
exports.deleteCart = async(req, res) => {
    const { user_id } = req.params
    try {
        const cart = await Cart.findOneAndDelete({ user_id });
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted" });
    }catch(error){
        res.status(500).json({ message: "Error when deleting cart", error: error.message });
    }
};