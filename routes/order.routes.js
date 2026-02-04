const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");

// Kullanıcının kendi işlemleri
router.post("/", authMiddleware, orderController.createOrder); // Sipariş ver
router.get("/my-orders", authMiddleware, orderController.getUserOrders); // Siparişlerimi gör
router.get("/:id", authMiddleware, orderController.getOrderDetails); // Tek bir sipariş detayı
router.put("/:id/status", authMiddleware, adminMiddleware, orderController.updateOrderStatus); // Durum güncelle

module.exports = router;