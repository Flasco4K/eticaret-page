const Product = require("../models/product.model");

class ProductRepository {
    async create(data) {
        return await Product.create(data);
    };

    async findAll() { 
        return await Product.find().populate('category');
    };

    async findByCategory(categoryId) {
        return await Product.find({ category: categoryId }).populate('Category');
    };

    async findByDescription(description) {
        return await Product.find({ $text: { $search: description }}).populate('Category');
    };

    async update(data, id) { 
        return await Product.findByIdAndUpdate(id, data, { new: true });
    };

    async delete(id) { 
        return await Product.findByIdAndDelete(id);
    };

    async updateStock(productId, quantity) {
        return await Product.findByIdAndUpdate(
            productId,
            {

                $inc: { stok: quantity }
            },
            { new: true }
        );
    }
};

module.exports = new ProductRepository();