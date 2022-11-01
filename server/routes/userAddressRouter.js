const Router = require("express");
const router = new Router();
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const userAddressController = require("../controllers/userAddressController");

router.post("/create", authMiddleware, userAddressController.create);

router.get(
  "/user/:userId",
  authMiddleware,
  userAddressController.getAllAddressesByUserId
);

router.put("/change", authMiddleware, userAddressController.changeAddressById);

router.delete("/delete", authMiddleware, userAddressController.deleteById);

module.exports = router;
