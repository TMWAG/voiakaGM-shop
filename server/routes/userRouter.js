const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);

router.get("/id/:id", userController.getOneById);
router.get("/role/:roleId", userController.getAllByRoleId);
router.get("/all", userController.getAll);

router.put("/add_tg", authMiddleware, userController.addTGLinkById);
router.put("/add_vk", authMiddleware, userController.addVKLinkById);
router.put("/change_phone", authMiddleware, userController.changePhoneById);
router.put(
  "/change_password",
  authMiddleware,
  userController.changePasswordById
);
router.put(
  "/change_role",
  checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
  userController.changeRoleIdById
);

router.delete(
  "/unlink_tg",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  userController.deleteTGLinkById
);
router.delete(
  "/unlink_vk",
  checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
  userController.deleteVKLinkById
);
router.delete(
  "/delete_user",
  checkRoleMiddleware(process.env.ADMINISTRATOR_ROLE_ID),
  userController.deleteById
);

module.exports = router;
