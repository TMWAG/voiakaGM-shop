const Router = require("express");
const router = new Router();
const deliveryServiceController = require("../controllers/deliveryServiceController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
    "/create",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    deliveryServiceController.create
);

router.get(
    "/id/:id",
    deliveryServiceController.getOneById
);
router.get(
    "/all",
    deliveryServiceController.getAll
);

router.put(
    "/update",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    deliveryServiceController.changeNameById
);

router.delete(
    "/delete",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    deliveryServiceController.deleteById
)

module.exports = router;