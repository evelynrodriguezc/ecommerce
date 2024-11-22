const Order = require("../models/order");
const Cart = require("../models/cart");
const { pool } = require("../models/order");

exports.createOrderfromCart = async(req, res) => {
    const { userId } = req.params;
    try {
        if(isNaN(userId)){
            return res.status(400).json({ message: "userId must be a valid number" });
        }
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if(userResult.rows.length === 0){
            return res.status(404).json({ message: "User not found in PostgreSQL" });
        }
        const cart = await Cart.findOne({ userId: parseInt(userId) }).populate("products.product")
        if(!cart){
            return res.status(404).json({ message: "Cart not found for the specified user" });
        }
        let total = 0;
        const productsOrder = cart.products.map((product) => {
            const price = product.product.price * product.quantity;
            total += price;
            return{
                product: product.product._id,
                quantity: product.quantity,
                price: price
            };
        });
        const newOrder = new Order({
            userId: parseInt(userId),
            cart: cart._id, //_id because of mongo structure
            products: productsOrder,
            total: total
        });
        await newOrder.save();

        await Cart.findByIdAndUpdate( cart._id, { products: [] });
        res.status(201).json({ message: "Order created successfully", order: newOrder});
    } catch (error) {
        res.status(500).json({message: "Error creating the order", error: error.message});
    }
};

exports.obtainOrder = async(req, res) => {
    const { orderId } = req.params
    try {
        const order = await Order.findById(orderId).populate("products.product");
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order found", order});
    } catch (error) {
        res.status(500).json({message: "Error when obtaining order", error: error.message});
    }
};
