const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), productController.create);

router.get("/all", productController.getAll);
router.get("/id/:id", productController.getOneById);
router.get("/vendor/:vendorId", productController.getAllByVendorId);
router.get("/category/:categoryId", productController.getAllByCategoryId);

router.put(
    "/change_vendor", 
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), 
    productController.changeVendorById
);
router.put(
    "/change_category", 
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), 
    productController.changeCategoryById
);
router.put(
    "/change_price", 
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), 
    productController.changePriceById
);
router.put(
    "/change_amount", 
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), 
    productController.changeAmountById
);
router.put(
    "/change_discount", 
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID), 
    productController.changeDiscountById
);
router.put(
    "/change_description",
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
    productController.changeDescriptionById
);

router.delete(
    "/delete",
    checkRoleMiddleware(process.env.MODERATOR_ROLE_ID),
    productController.deleteById
)

module.exports = router;
