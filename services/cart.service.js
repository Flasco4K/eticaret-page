const cartRepository = require("../repository/cart.repository");

class CartService {
    async addToCart(userId, productId, quantity) {
        let cart = await cartRepository.findByUserId(userId); //Müşterinin Elinde Seper Var mı

        if (!cart) { //Eğer Sepet Yoksa
            const newCartData = {
                user: userId,
                products: [{ product: productId, quantity: quantity }]
            };
            return await cartRepository.create(newCartData);
        }

        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }
        return await cartRepository.update(userId, cart);
    }
}