const CartService = require("../services/cart.service");

class CartController {
    async addToCart(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user.id;

            const newCart = await CartService.addToCart(userId, productId, quantity);
            res.status(200).json({
                success: true,
                message: "Sepetiniz Eklendi",
                data: newCart
            })
        } catch (error) {
            next(error);
        }
    };

    async getCart(req, res, next) {
        try {
            const userId = req.user.id;

            const cart = await CartService.getCart(userId);
            res.status(200).json({
                success: true,
                message: "Sepetiniz Getirildi",
                data: cart
            })
        } catch (error) {
            next(error);
        }
    };

    async removeFromCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { productId } = req.params;

            const remove = await CartService.removeFromCart(userId, productId);
            res.status(200).json({
                success: true,
                data: remove
            });
        } catch (error) {
            next(error);
        }
    };
};

module.exports = new CartController()