const Order = require("../models/order.model");

class orderRepository {
    async create(orderData) { // Yeni bir sipariş kaydı oluşturur
        return await Order.create(orderData);
    };

    async findByUser(userId) { // Bir kullanıcının geçmiş tüm siparişlerini ürün detaylarıyla birlikte getirir
        return await Order.find({ user: userId }).populate('products.product')
    };

    async updateStatus(orderId, status) { // Siparişin durumunu günceller ve yeni veriyi geri döner
        return await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
    };
};

module.exports = new orderRepository();