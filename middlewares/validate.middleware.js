// Gelen verilerin eksik olup olmadığını kontrol eder
const validateMiddleware = (schema) => {
    return (req, res, next) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Veri kutusu boş!" });
        }
        next();
    };
};

module.exports = validateMiddleware;