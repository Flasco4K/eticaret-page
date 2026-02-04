const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

// 1. Veritabanı Bağlantısı
connectDB();

app.use(express.json());

//Rotalar
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category",categoryRoutes)
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});