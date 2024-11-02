const Category = require("../models/category");

exports.createCategory = async(req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({message: "Error creating the category", error: error.message});
    }
};

exports.obtainCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining categories", error: error.message});
    }
};

exports.updateCategory = async(req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({message: "Error when updating category", error: error.message});
    }
};

exports.deleteCategory = async(req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error when deleting category", error: error.message});
    }
};