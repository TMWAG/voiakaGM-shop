const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), categoryController.create);

router.get("/all", categoryController.getAll);
router.get("/id/:id", categoryController.getOneById);

router.put("/rename", checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), categoryController.changeNameById);

router.delete("/delete", checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID), categoryController.deleteById);

module.exports = router;