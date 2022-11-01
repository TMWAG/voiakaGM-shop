const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
    "/create",
    authMiddleware,
    orderController.create
);

router.get(
    "/all",
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
    orderController.getAll
);
router.get(
    "/user/:userId",
    authMiddleware,
    orderController.getAllByUserId
);
router.get(
    "/status/:statusId",
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
    orderController.getAllByStatusId
);
router.get(
    "/delivery_service/:deliveryServiceId",
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
    orderController.getAllByDeliveryServiceId
);
router.get(
    "/current",
    authMiddleware,
    orderController.getCurrentOrderByUserId
);

router.put(
    "/add_track",
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
    orderController.addTrackNoById
);
router.put(
    "/add_address",
    authMiddleware,
    orderController.addUserAddressById
);
router.put(
    "/approved",
    authMiddleware,
    orderController.changeStatusToApprovedById
);
router.put(
    "/paid",
    authMiddleware,
    orderController.changeStatusToPaidById
);
router.put(
    "/completed",
    authMiddleware,
    orderController.changeStatusToCompletedById
);
router.put(
    "/sent",
    authMiddleware,
    orderController.changeStatusToSentForDeliveryById
);
router.put(
    "/delivered",
    authMiddleware,
    orderController.changeStatusToDeliveredById
);

router.delete(
    "/delete",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    orderController.deleteById
)

module.exports = router;