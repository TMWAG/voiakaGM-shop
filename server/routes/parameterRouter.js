const Router = require("express");
const router = new Router();
const parameterController = require("../controllers/parameterController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID), parameterController.create);

router.get("/all", parameterController.getAll);
router.get("/id/:id", parameterController.getOneById);

router.put("/rename", checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID), parameterController.changeNameById);

router.delete("/delete", checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID), parameterController.deleteById);

module.exports = router;