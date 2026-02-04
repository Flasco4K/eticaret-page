const Category = require("../models/category.model");

class categoryRepository {
    async create(data) { // Yeni bir kategori oluşturur
        return await Category.create(data);
    };

    async findAll() { // Mevcut tüm kategorileri listeler
        return await Category.find()
    };

    async findById(id) { // ID üzerinden kategori detayını getirir
        return await Category.findById(id);
    };

    async delete(id) { // Kategoriyi sistemden siler
        return await Category.findByIdAndDelete(id);
    }
};

module.exports = new categoryRepository();