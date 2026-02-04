const Product = require("../models/product.model");

class productRepository {
    async create(data) {
        return await Product.create(data);
    };

    async findAll() {
        return await Product.find().populate('category');
    };

    async findByCategory(categoryId) {
        return await Product.find({ category: categoryId }).populate('category');
    };

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    };
};

module.exports = new productRepository();