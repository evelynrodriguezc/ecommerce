const Order = require("../models/order");
const Cart = require("../models/cart");

exports.createOrderfromCart = async(req, res) => {
    const { userId } = req.params
    try {
        const cart = await Cart.findOne({ userId: userId }).populate("products.product")
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
        let total = 0;
        const productsOrder = cart.products.map(item => {
            const price = item.product.price * item.quantity
            total += price;
            return{
                product: item.product,
                quantity: item.quantity,
                price: price
            }
        });
        const newOrder = new Order({
            userId: userId,
            cartId: cart._id, //_id because of mongo structure
            products: productsOrder,
            total: total
        });
        await newOrder.save();
        await Cart.findByIdAndUpdate({ userId: userId}, { products: [] });
        res.status(201).json({ message: "Order created successfully", order: newOrder});
    } catch (error) {
        res.status(500).json({message: "Error creating the order", error: error.message});
    }
};

exports.obtainOrder = async(req, res) => {
    const { userId, orderId } = re.params
    try {
        const order = await Order.find({_id: orderId, userId: userId}).populate("products.product");
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining order", error: error.message});
    }
};
