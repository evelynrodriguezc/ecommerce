const Order = require("../models/order");

exports.createOrder = async(req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({message: "Error creating the order", error: error.message});
    }
};

exports.obtainOrder = async(req, res) => {
    try {
        const order = await Order.find().populate("user").populate("products.product");
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining order", error: error.message});
    }
};

exports.updateOrder = async(req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: "Error when updating order", error: error.message});
    }
};

exports.deleteOrder = async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Order deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error when deleting order", error: error.message});
    }
};