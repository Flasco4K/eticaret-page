const Order = require("../models/order.model");

class orderRepository {
    async create(orderData) { // Yeni bir sipariş kaydı oluşturur
        return await Order.create(orderData);
    };

    async findOrdersByUserId(userId) {
        return await Order.find({ user: userId }).sort({ createdAt: -1 });
    };

    async findByUser(userId) { // Bir kullanıcının geçmiş tüm siparişlerini ürün detaylarıyla birlikte getirir
        return await Order.find({ user: userId }).populate('products.product')
    };

    async findById(orderId) { // Tek bir siparişi ID ile tüm detaylarıyla getirir
        return await Order.findById(orderId).populate('User', 'username email').populate('products.product');
    };

    async findAll() { // Tüm siparişleri listeler (Admin paneli için)
        return await Order.find().populate('User', 'username email').sort({ createdAt: -1 });
    };

    async updateStatus(orderId, status) { // Siparişin durumunu günceller ve yeni veriyi geri döner
        return await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
    };

    async delete(orderId) { // Siparişi sistemden tamamen kaldırır
        return await Order.findByIdAndDelete(orderId);
    };

};

module.exports = new orderRepository();