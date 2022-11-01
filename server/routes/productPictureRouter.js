const Router = require("express");
const router = new Router();
const productPictureController = require("../controllers/productPictureController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
  "/add",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  productPictureController.addToProductById
);

router.get("/:productId", productPictureController.getAllByProductId);

router.delete(
  "/delete",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  productPictureController.deleteById
);
router.delete(
  "/product_delete",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  productPictureController.deleteAllByProductId
);

module.exports = router;
