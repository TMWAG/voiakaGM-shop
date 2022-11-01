const Router = require("express");
const router = new Router();
const orderedProductController = require("../controllers/orderedProductController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, orderedProductController.create);

router.get(
  "/order/:orderId",
  authMiddleware,
  orderedProductController.getAllByOrderId
);

router.put(
  "/change_amount",
  authMiddleware,
  orderedProductController.changeAmountById
);

router.delete("/delete", authMiddleware, orderedProductController.deleteById);

module.exports = router;
