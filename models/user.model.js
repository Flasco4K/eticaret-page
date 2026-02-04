const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], //Sadece Bu İki Değerden Biri Olabilir
        default: 'customer' //Yeni Kayıt olan herkes önce müşteri olarak başlar
    },
    isVerified: {
        type: Boolean,
        default: false //Kayıt Olurken onaylı Değil, Nodemailer ile Onaylanacak
    },
    // Nodemailer'dan gelen 6 haneli kodu burada tutacağız
    verificationCode: {
        type: String,
        default: null
    },
    // Güvenlik için kodun bir süresi olsun
    verificationCodeExpires: {
        type: Date,
        default: () => Date.now() + 10 * 60 * 1000 // 10 dakika sonra patlar
    }
}, { timestamps: true }); // Kayıt ve güncelleme tarihlerini otomatik tutar;
module.exports = mongoose.model("User", userSchema);