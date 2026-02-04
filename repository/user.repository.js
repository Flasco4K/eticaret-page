const User = require("../models/user.model");

class UserRepository {
    async create(userData) { // Yeni bir kullanıcıyı veritabanına kaydeder
        return await User.create(userData);
    };

    async findByEmail(email) { // Email adresine göre kullanıcıyı bulur
        return await User.findOne({ email })
    };

    async findById(id) { // ID üzerinden tek bir kullanıcı getirir
        return await User.findById(id);
    };

    async updateVerifyStatus(id, status) { // Kullanıcının email onay durumunu
        return await User.findByIdAndUpdate(id, { isVerified: status }, { new: true });
    };
};

module.exports = new UserRepository();