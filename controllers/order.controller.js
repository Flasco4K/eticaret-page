const orderService = require("../services/order.service");

class OrderController {
    async createOrder(req, res, next) { // Sipariş ver
        try {
            const { cartData, shippingAddress } = req.body;
            const userId = req.user.id; 

            const newOrder = await orderService.createOrder(userId, cartData, shippingAddress);

            res.status(201).json({
                success: true,
                message: "Siparişiniz başarıyla oluşturuldu!",
                data: newOrder
            });
        } catch (error) {
            next(error);
        }
    };

   async getUserOrders(req, res, next) { // Siparişlerimi gör
        try {
            const userId = req.user.id;
            const orders = await orderService.getUserOrders(userId);

            res.status(200).json({
                success: true,
                message: "Sipariş geçmişiniz başarıyla getirildi!",
                data: orders
            });
        } catch (error) {
            next(error);
        }
    };

    async getOrderDetails(req, res, next) { // Tek bir sipariş detayı
        try {
            const orderId = req.params.id;
            const userId = req.user.id;

            const order = await orderService.getOrderDetails(orderId, userId);

            res.status(200).json({
                success: true,
                message: "Sipariş detayı getirildi!",
                data: order
            });
        } catch (error) {
            next(error);
        }
    };

    async updateOrderStatus(req, res, next) { // Durum güncelle
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updatedOrder = await orderService.updateOrderStatus(id, status);

            res.status(200).json({
                success: true,
                message: "Sipariş durumu başarıyla güncellendi!",
                data: updatedOrder
            });
        } catch (error) {
            next(error);
        }
    };

}

module.exports = new OrderController();