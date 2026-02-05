const cartRepository = require("../repository/cart.repository");

class CartService {
    async addToCart(userId, productId, quantity) {
        let cart = await cartRepository.findByUserId(userId); //Müşterinin Elinde Seper Var mı

        if (!cart) { //Eğer Sepet Yoksa
            const newCartData = { //Boş Bir Sepet Oluşturuyoruz
                user: userId,
                products: [{ product: productId, quantity: quantity }] //İçine Müşterinin istediği İlk Ürünü ve Adedini Koyuyoruz
            };
            return await cartRepository.create(newCartData);
        }
        // Ürün Zaten Var mı ?
        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }
        return await cartRepository.update(userId, cart);
    };

    async removeFromCart(userId, productId) {
        const cart = await cartRepository.findByUserId(userId);

        if (!cart) {
            throw new Error("Sepet Bulunamadı!");
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId.toString()); //Ürünün ID'si, silmek istediğim ID'ye EŞİT OLMAYANLARI tut.
        return await cartRepository.update(userId, cart);
    };

    async getCart(userId) {
        const cart = await cartRepository.findByUserId(userId);
        if (!cart) {
            return { products: [] }
        }
        return cart
    };
};

module.exports = new CartService();