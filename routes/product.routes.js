const router = require("express").Router();
const productController = require("../controllers/product.controller");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", authMiddleware, adminMiddleware, productController.createProduct);

module.exports = router;