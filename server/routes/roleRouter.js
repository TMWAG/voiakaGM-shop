const Router = require("express");
const router = new Router();
const roleController = require("../controllers/roleController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRoleMiddleware(3), roleController.create);

router.get("/all", roleController.getAll);
router.get("/:id", roleController.getOneById);

router.put("/rename", checkRoleMiddleware(3), roleController.renameById);

router.delete("/delete", checkRoleMiddleware(3), roleController.deleteById);

module.exports = router;