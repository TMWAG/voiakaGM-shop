const Router = require("express");
const router = new Router();
const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
    "/create", 
    authMiddleware,
    feedbackController.create
);

router.get(
    "/user/:userId",
    feedbackController.getAllByUserId
);
router.get(
    "/product/:productId",
    feedbackController.getAllByProductId
);

router.put(
    "/change_text",
    authMiddleware,
    feedbackController.changeTextById
);
router.put(
    "/change_rating",
    authMiddleware,
    feedbackController.changeRatingById
);

router.delete(
    "/delete",
    checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
    feedbackController.deleteById
);

module.exports = router;