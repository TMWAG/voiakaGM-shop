const Router = require("express");
const router = new Router();
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const characteristicController = require("../controllers/characteristicController");

router.post(
  "/create",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  characteristicController.create
);

router.get("/id/:id", characteristicController.getOneById);
router.get("/product/:productId", characteristicController.getAllByProductId);

router.put(
  "/change_parameter",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  characteristicController.changeParameterById
);
router.put(
  "/change_value",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  characteristicController.changeValueById
);

router.delete(
  "/delete",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  characteristicController.deleteById
);
router.delete(
  "/delete_product",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  characteristicController.deleteAllByProductId
);

module.exports = router;
