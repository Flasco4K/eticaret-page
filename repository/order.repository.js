const Order = require("../models/order.model");

class orderRepository {
    async create(orderData) {
        return await Order.create(orderData);
    };

    async findByUser(userId) {
        return await Order.find({ user: userId }).populate('products.product') // Kullanıcının tüm siparişlerini bul ve içindeki ürün bilgilerini getir
    };

    async updateStatus(orderId, status) {
        return await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
    };
};

module.exports = new orderRepository();