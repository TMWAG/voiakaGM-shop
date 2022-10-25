const Router = require("express");
const router = new Router();
const vendorController = require("../controllers/vendorController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), vendorController.create);

router.get("/all", vendorController.getAll);
router.get("/id/:id", vendorController.getOneById);

router.put("/rename", checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), vendorController.changeNameById);

router.delete("/delete", checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID), vendorController.deleteById);

module.exports =  router;