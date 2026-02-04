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
        default : false //Kayıt Olurken onaylı Değil, Nodemailer ile Onaylanacak
    }
});
module.exports = mongoose.model("User", userSchema);