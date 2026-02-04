const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Siparişi veren kullanıcının ID'si
        required: true
    },
    products: [
        {
            product: { //ürün
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product", // Satın alınan ürünün ID'si
                required: true 
            },
            quantity: { //miktar
                type: Number, 
                default: 1, // Kaç adet alındı
                min: [1, "Miktar 1'den az olamaz kanka!"] 
            },
            price: {  //fiyat
                type: Number, // Sipariş anındaki ürün fiyatı (fiyat değişse de burası sabit kalır)
                required: true
            }
        }
    ],
    totalPrice: { //Toplam Fiyat
        type: Number, // Tüm ürünlerin toplam maliyeti
        required: true
    },
    shippingAddress: { // Kargonun gideceği adres detayları
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, default: "Türkiye" }
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'], // Siparişin aşamaları
        default: 'pending' // İlk oluşturulduğunda "beklemede" olur
    }
}, { timestamps: true }); // Oluşturulma ve güncellenme tarihlerini otomatik tutar

module.exports = mongoose.model("Order", orderSchema);