const Cart = require("../models/cart.model");

class cartRepository {
    async findByUserId(userId) {
        return await Cart.findOne({ user: userId }).populate("products.product");;
    };

    async create(cartData) {
        return await Cart.create(cartData);
    };

    async update(userId, cartData) {
        return await Cart.findOneAndUpdate({ user: userId }, cartData, { new: true }).populate("products.product");;
    };
    async deleteByUserId(userId) {
        return await Cart.findOneAndDelete({ user: userId });
    }
};

module.exports = new cartRepository();