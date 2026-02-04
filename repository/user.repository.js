const User = require("../models/user.model");

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email })
    };

    async findById(id) {
        return await User.findById(id);
    };

    async create(userData) {
        return await User.create(userData);
    };

    async updateVerifyStatus(id, status) {
        return await User.findByIdAndUpdate(id, { isVerified: status }, { new: true });
    };
};

module.exports = new UserRepository();