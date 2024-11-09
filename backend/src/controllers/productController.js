const Product = require("../models/product");

exports.createProduct = async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message: "Error creating the product: ", error: error.message});
    }
};

exports.obtainProducts = async(req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining products", error: error.message});
    }
};

exports.updateProduct = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: "Error when updating product", error: error.message});
    }
};

exports.getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining product", error: error.message});
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error when deleting product", error: error.message});
    }
};