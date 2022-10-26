const Router = require("express");
const router = new Router();
const roleController = require("../controllers/roleController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
  "/create",
  checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE),
  roleController.create
);

router.get("/all", roleController.getAll);
router.get("/:id", roleController.getOneById);

router.put(
  "/rename",
  checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE),
  roleController.renameById
);

router.delete(
  "/delete",
  checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE),
  roleController.deleteById
);

module.exports = router;
