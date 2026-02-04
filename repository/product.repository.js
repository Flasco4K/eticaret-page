const Product = require("../models/product.model");

class productRepository {
    async create(data) { // Yeni bir ürünü sisteme ekler
        return await Product.create(data);
    };

    async findAll() { // Tüm ürünleri getirir (Kategori bilgilerini de içine doldurur)
        return await Product.find().populate('category');
    };

    async findByCategory(categoryId) { // Sadece belirli bir kategoriye ait ürünleri listeler
        return await Product.find({ category: categoryId }).populate('category');
    };

    async update(data, id) { // Ürünü ID'sine göre veritabanından günceller
        return await Product.findByIdAndUpdate(id, data, { new: true });
    };

    async delete(id) { // Ürünü ID'sine göre veritabanından siler
        return await Product.findByIdAndDelete(id);
    };

    async updateStock(productId, quantity){
        return await Product.findByIdAndUpdate(
            productId, 
            { 
                // $inc (increment): Mevcut sayıya ekleme yapar. 
                $inc: { stok: quantity } 
            }, 
            { new: true }
        );
    }
};

module.exports = new productRepository();