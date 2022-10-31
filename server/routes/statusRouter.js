const Router = require("express");
const router = new Router();
const statusController = require("../controllers/statusController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
    "/create",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    statusController.create
);

router.get(
    "/id/:id",
    statusController.getOneById
);
router.get(
    "/all",
    statusController.getAll
);

router.put(
    "/update",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    statusController.changeNameById
);

router.delete(
    "/delete",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    statusController.deleteById
);

module.exports = router;