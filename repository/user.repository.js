const User = require("../models/user.model");

class UserRepository {
  findByEmail(email) {
    return User.findOne({ email });
  }

  findByVerificationCode(code) {
    return User.findOne({
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() }
    });
  }

  create(data) {
    return User.create(data);
  }

  updateById(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = new UserRepository();
