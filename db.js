const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Veritabanına bağlandık! 🎯");
    } catch (err) {
        console.log("DB Bağlantı hatası ", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;