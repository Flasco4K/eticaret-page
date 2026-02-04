const Category = require("../models/category.model");

class categoryRepository {
    async create(data) {
        return await Category.create(data);
    };

    async findAll() {
        return await Category.find()
    };

    async findById(id) {
        return await Category.findById(id);
    };

    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
};

module.exports = new categoryRepository();