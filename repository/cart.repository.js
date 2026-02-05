const Cart = require("../models/cart.model");

class cartRepository {
    async findByUserId(userId) {
        return await Cart.findOne({ user: userId });
    };

    async create(cartData) {
        return await Cart.create(cartData);
    };

    async update(userId, cartData) {
        return await Cart.findOneAndUpdate({ user: userId }, cartData, { new: true });
    };
};

module.exports = new cartRepository();