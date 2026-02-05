const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get("/", CartController.getCart); // 
router.post("/add", CartController.addToCart);
router.delete("/remove/:productId", CartController.removeFromCart);

module.exports = router;