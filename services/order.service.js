const orderRepository = require("../repository/order.repository");
const productRepository = require("../repository/product.repository")

class OrderService {
    async createOrder(userId, cartData, shippingAddress) {
        // Sepet boş mu kontrolü
        if (!cartData || !cartData.products || cartData.products.length === 0) {
            throw new Error("Sepetiniz Boş!")
        }
        let totalPrice = 0; //Toplam Tutar Burda Birikecek
        const orderItems = []; //Kontrolden Geçmiş ürünler Burda Listelenecek

        for (const item of cartData.products) {
            const product = await productRepository.findById(item.product);

            if (!product) {
                throw new Error(`Ürün bulunamadı! ID: ${item.product}`);
            }

            if (product.stok < item.quantity) {
                throw new Error(`${product.name} için Stok Yetersiz! Mevcut Stok ${product.stok} `)
            }

            const itemPrice = product.price * item.quantity;
            totalPrice += itemPrice;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }
    };

    async getUserOrders(userId) {
        const orders = await orderRepository.findByUser(userId);

        if (!orders) {
            return [];
        }
        return orders;
    };

    async getOrderDetails(orderId, userId){
        const order = await orderRepository.findById(orderId);

        if (!order) {
        throw new Error("Sipariş bulunamadı!");
    }

        if(order.user.toString() !== userId.toString()) {
            throw new Error("Bu sipariş sana ait değil!")
        }
        return order
    };

    async updateOrderStatus(orderId, status){
        const orderStatus = await orderRepository.findById(orderId);
        if(!orderStatus){
            throw new Error("Böyle bir Sipariş Bulunamadı!");
        }

        const updatedStatus = await orderRepository.updateStatus(orderId,status)
        return updatedStatus;
    }

}