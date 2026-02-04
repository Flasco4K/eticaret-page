const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Hatayı konsola ver

    const statusCode = err.statusCode || 500;
    const message = err.message || "Sunucu taraflı bir hata oluştu!";

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = errorMiddleware;