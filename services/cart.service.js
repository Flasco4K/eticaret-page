const cartRepository = require("../repository/cart.repository");

class CartService {
    async addToCart(userId, productId, quantity) {
        const result = await Cart.findOneAndUpdate(
            { user: userId, "products.product": productId },
            { $inc: { "products.$.quantity": quantity } },
            { new: true }
        );
        if (!result) { 
            return await Cart.findOneAndUpdate(
                { user: userId },
                { $push: { products: { product: productId, quantity: quantity } } },
                { upsert: true, new: true }
            );
        }
        return result;
    };

    async removeFromCart(userId, productId) {
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { product: productId } } },
            { new: true }
        );

        if (!updatedCart) {
            throw new Error("Sepet Bulunamadı!");
        }
        return updatedCart;
    }

    async getCart(userId) {
        const cart = await cartRepository.findByUserId(userId);
        if (!cart) {
            return { products: [] }
        }
        return cart
    };
};

module.exports = new CartService();