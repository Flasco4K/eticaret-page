const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");

router.get("/", categoryController.getAllCategory)
router.post("/", authMiddleware, adminMiddleware, categoryController.createCategory)
router.delete("/:id", authMiddleware, adminMiddleware, categoryController.deleteCategory)

module.exports = router;